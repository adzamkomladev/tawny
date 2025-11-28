import { eq, inArray } from "drizzle-orm";
import { AwsClient } from "aws4fetch";
import { tables, useHttpDb } from "./db";

// ============================================================================
// Types
// ============================================================================

export interface UploadResult {
  assetId: string;
  pathname: string;
  contentType: string;
  size: number;
}

export interface UploadOptions {
  prefix?: string;
  bucket?: string;
  addRandomSuffix?: boolean;
  creatorId?: string;
}

export interface SignedUrlOptions {
  /** URL expiration time in seconds (default: 3600 = 1 hour) */
  expiresIn?: number;
}

export interface PresignedUploadOptions {
  /** Filename for the upload */
  filename: string;
  /** Content type of the file */
  contentType: string;
  /** Optional prefix/folder path (default: "uploads") */
  prefix?: string;
  /** Bucket name for the asset record (default: "default") */
  bucket?: string;
  /** URL expiration time in seconds (default: 3600 = 1 hour) */
  expiresIn?: number;
  /** Creator user ID */
  creatorId?: string;
}

export interface PresignedUploadResult {
  /** The asset ID (save this to your database) */
  assetId: string;
  /** The presigned URL to upload the file to */
  uploadUrl: string;
  /** The pathname in storage (for reference) */
  pathname: string;
}

interface CreateAssetRecordOptions {
  creatorId?: string | null;
  pathname: string;
  originalName: string;
  bucket: string;
  contentType: string;
  size?: string | null;
}

type SignMethod = "GET" | "PUT";

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Generate a random suffix for filenames
 */
function generateRandomSuffix(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Extract file extension from filename (includes the dot)
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot !== -1 ? filename.substring(lastDot) : "";
}

/**
 * Extract base name from filename (without extension)
 */
function getFileBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot !== -1 ? filename.substring(0, lastDot) : filename;
}

/**
 * Generate a unique pathname for storage
 */
function generatePathname(filename: string, prefix: string): string {
  const suffix = generateRandomSuffix();
  const ext = getFileExtension(filename);
  const baseName = getFileBaseName(filename);
  return `${prefix}/${baseName}-${suffix}${ext}`;
}

/**
 * Create an asset record in the database
 */
async function createAssetRecord(options: CreateAssetRecordOptions): Promise<string> {
  const db = useHttpDb();
  const [asset] = await db
    .insert(tables.assets)
    .values({
      creatorId: options.creatorId ?? null,
      pathname: options.pathname,
      originalName: options.originalName,
      bucket: options.bucket,
      contentType: options.contentType,
      size: options.size ?? null,
    })
    .returning({ id: tables.assets.id });

  return asset.id;
}

/**
 * Generate a presigned read URL with fallback to API route
 */
async function getPresignedUrlWithFallback(
  assetId: string,
  pathname: string,
  options: SignedUrlOptions = {}
): Promise<string> {
  try {
    return await createPresignedReadUrl(pathname, options);
  } catch {
    // Fallback to API route in development without --remote
    return `/api/assets/${assetId}`;
  }
}

/**
 * Core function to create a presigned URL for a pathname.
 * This is the internal implementation used by all presigned URL functions.
 * 
 * @internal
 */
async function createPresignedUrl(
  pathname: string,
  method: SignMethod,
  options: { expiresIn?: number; permission?: "object-read-only" | "object-read-write" } = {}
): Promise<string> {
  const { expiresIn = 3600, permission = "object-read-only" } = options;

  const blob = hubBlob();
  const { accountId, bucketName, ...credentials } = await blob.createCredentials({
    permission,
    pathnames: [pathname],
    ttl: expiresIn,
  });

  const client = new AwsClient(credentials);
  const endpoint = new URL(
    pathname,
    `https://${bucketName}.${accountId}.r2.cloudflarestorage.com`
  );

  const { url } = await client.sign(endpoint, {
    method,
    aws: { signQuery: true },
  });

  return url;
}

// ============================================================================
// Presigned URL Generation (for existing assets)
// ============================================================================

/**
 * Generate a presigned read URL for a pathname directly.
 * Use this when you have the pathname but not necessarily an asset record.
 * 
 * Note: Only works in production or with `--remote` flag in development
 */
export async function createPresignedReadUrl(
  pathname: string,
  options: SignedUrlOptions = {}
): Promise<string> {
  return createPresignedUrl(pathname, "GET", {
    expiresIn: options.expiresIn,
    permission: "object-read-only",
  });
}

/**
 * Generate a presigned write URL for a pathname directly.
 * Use this when you need to upload to a specific path.
 * 
 * Note: Only works in production or with `--remote` flag in development
 */
export async function createPresignedWriteUrl(
  pathname: string,
  options: SignedUrlOptions = {}
): Promise<string> {
  return createPresignedUrl(pathname, "PUT", {
    expiresIn: options.expiresIn,
    permission: "object-read-write",
  });
}

/**
 * Generate a presigned URL for an asset by ID.
 * This creates a temporary public URL that can be used directly in <img> tags etc.
 * 
 * Note: Only works in production or with `--remote` flag in development
 */
export async function getAssetUrl(
  assetId: string,
  options: SignedUrlOptions = {}
): Promise<string | null> {
  const asset = await getAsset(assetId);
  if (!asset) return null;

  return getPresignedUrlWithFallback(assetId, asset.pathname, options);
}

/**
 * Generate presigned URLs for multiple assets
 */
export async function getAssetUrls(
  assetIds: string[],
  options: SignedUrlOptions = {}
): Promise<Record<string, string | null>> {
  const results: Record<string, string | null> = {};

  await Promise.all(
    assetIds.map(async (id) => {
      results[id] = await getAssetUrl(id, options);
    })
  );

  return results;
}

// ============================================================================
// Presigned Upload (create asset + get upload URL)
// ============================================================================

/**
 * Create a presigned URL for direct client-side upload to R2.
 * This creates the asset record first, then returns a URL the client can PUT to.
 * 
 * Note: Only works in production or with `--remote` flag in development
 */
export async function createPresignedUpload(
  options: PresignedUploadOptions
): Promise<PresignedUploadResult> {
  const {
    filename,
    contentType,
    prefix = "uploads",
    bucket = "default",
    expiresIn = 3600,
    creatorId,
  } = options;

  const pathname = generatePathname(filename, prefix);

  const assetId = await createAssetRecord({
    creatorId,
    pathname,
    originalName: filename,
    bucket,
    contentType,
  });

  const uploadUrl = await createPresignedWriteUrl(pathname, { expiresIn });

  return {
    assetId,
    uploadUrl,
    pathname,
  };
}

/**
 * Confirm an upload completed and update the asset record with file size.
 * Call this after the client successfully uploads to the presigned URL.
 */
export async function confirmUpload(assetId: string): Promise<boolean> {
  const asset = await getAsset(assetId);
  if (!asset) return false;

  try {
    // Get the blob metadata to confirm it exists and get size
    const blobMeta = await hubBlob().head(asset.pathname);

    if (!blobMeta) return false;

    // Update asset with actual size
    const db = useHttpDb();
    await db
      .update(tables.assets)
      .set({ size: blobMeta.size.toString() })
      .where(eq(tables.assets.id, assetId));

    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// Server-side Upload (fallback for development)
// ============================================================================

/**
 * Upload a file to NuxtHub blob storage and create an asset record.
 * This is a server-side upload - use createPresignedUpload for client-side uploads.
 */
export async function uploadAsset(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    prefix = "uploads",
    bucket = "default",
    addRandomSuffix = true,
    creatorId,
  } = options;

  const blob = await hubBlob().put(file.name, file, {
    addRandomSuffix,
    prefix,
  });

  const contentType = file.type || blob.contentType || "application/octet-stream";

  const assetId = await createAssetRecord({
    creatorId,
    pathname: blob.pathname,
    originalName: file.name,
    bucket,
    contentType,
    size: blob.size.toString(),
  });

  return {
    assetId,
    pathname: blob.pathname,
    contentType,
    size: blob.size,
  };
}

// ============================================================================
// Asset CRUD Operations
// ============================================================================

/**
 * Get asset metadata by ID
 */
export async function getAsset(assetId: string) {
  const db = useHttpDb();
  const [asset] = await db
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.id, assetId))
    .limit(1);

  return asset ?? null;
}

/**
 * Get multiple assets by IDs in a single query
 */
export async function getAssets(assetIds: string[]) {
  if (assetIds.length === 0) return [];

  const db = useHttpDb();
  const assets = await db
    .select()
    .from(tables.assets)
    .where(inArray(tables.assets.id, assetIds));

  return assets;
}

/**
 * Generate presigned URLs for multiple assets using a single DB query
 */
export async function getAssetUrlsBulk(
  assetIds: string[],
  options: SignedUrlOptions = {}
): Promise<Record<string, string | null>> {
  if (assetIds.length === 0) return {};

  const assets = await getAssets(assetIds);
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  const results: Record<string, string | null> = {};

  await Promise.all(
    assetIds.map(async (id) => {
      const asset = assetMap.get(id);
      if (!asset) {
        results[id] = null;
        return;
      }
      results[id] = await getPresignedUrlWithFallback(id, asset.pathname, options);
    })
  );

  return results;
}

/**
 * Serve an asset by ID - fallback for development without presigned URLs
 */
export async function serveAssetById(assetId: string, event: any) {
  const asset = await getAsset(assetId);

  if (!asset) {
    throw createError({
      statusCode: 404,
      message: "Asset not found",
    });
  }

  return hubBlob().serve(event, asset.pathname);
}

/**
 * Delete an asset by ID from blob storage and database
 */
export async function deleteAsset(assetId: string): Promise<boolean> {
  const db = useHttpDb();

  // Get asset to find pathname
  const asset = await getAsset(assetId);

  if (!asset) {
    return false;
  }

  // Delete from blob storage
  await hubBlob().del(asset.pathname);

  // Delete asset record
  const result = await db
    .delete(tables.assets)
    .where(eq(tables.assets.id, assetId))
    .returning({ id: tables.assets.id });

  return result.length > 0;
}

/**
 * List assets for a specific user with presigned URLs
 */
export async function listUserAssets(
  creatorId: string,
  options: SignedUrlOptions = {}
) {
  const db = useHttpDb();
  const assets = await db
    .select()
    .from(tables.assets)
    .where(eq(tables.assets.creatorId, creatorId));

  const assetsWithUrls = await Promise.all(
    assets.map(async (asset) => ({
      ...asset,
      url: await getPresignedUrlWithFallback(asset.id, asset.pathname, options),
    }))
  );

  return assetsWithUrls;
}
