import type { PresignUploadForm } from '~~/schemas/assets';

interface PresignResult {
  assetId: string;
  uploadUrl: string;
}

interface UploadResult {
  assetId: string;
  url: string | null;
}

interface ConfirmResult {
  url: string | null;
}

export const useAssets = () => {
  /**
   * Get a presigned URL for direct upload to R2
   */
  async function getPresignedUrl(data: PresignUploadForm): Promise<PresignResult | null> {
    try {
      const res = await $fetch('/api/assets/presign', {
        method: 'POST',
        body: data,
      });

      return {
        assetId: res.assetId,
        uploadUrl: res.uploadUrl,
      };
    } catch (error) {
      console.error('Failed to get presigned URL:', error);
      return null;
    }
  }

  /**
   * Upload file directly to presigned URL
   */
  async function uploadToPresignedUrl(uploadUrl: string, file: File): Promise<boolean> {
    try {
      await $fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      return true;
    } catch (error) {
      console.error('Failed to upload to presigned URL:', error);
      return false;
    }
  }

  /**
   * Confirm upload completion
   */
  async function confirmUpload(assetId: string): Promise<ConfirmResult | null> {
    try {
      const res = await $fetch('/api/assets/confirm', {
        method: 'POST',
        body: { assetId },
      });

      return { url: res.url };
    } catch (error) {
      console.error('Failed to confirm upload:', error);
      return null;
    }
  }

  /**
   * Upload file using presigned URL flow
   * Returns assetId on success, null on failure
   */
  async function uploadWithPresign(file: File, prefix?: string): Promise<string | null> {
    // Get presigned URL
    const presign = await getPresignedUrl({
      filename: file.name,
      contentType: file.type,
      prefix,
    });

    if (!presign) return null;

    // Upload to presigned URL
    const uploaded = await uploadToPresignedUrl(presign.uploadUrl, file);
    if (!uploaded) return null;

    // Confirm upload
    const confirmed = await confirmUpload(presign.assetId);
    if (!confirmed) return null;

    return presign.assetId;
  }

  /**
   * Fallback: Upload file directly via server endpoint
   * Use this when presigned URLs are not available (local dev)
   */
  async function uploadDirect(file: File, prefix?: string): Promise<UploadResult | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (prefix) formData.append('prefix', prefix);

      const res = await $fetch('/api/assets/upload', {
        method: 'POST',
        body: formData,
      });

      return {
        assetId: res.assetId,
        url: res.url,
      };
    } catch (error) {
      console.error('Failed to upload file:', error);
      return null;
    }
  }

  /**
   * Upload a file - tries presigned URL first, falls back to direct upload
   * Returns assetId on success, null on failure
   */
  async function upload(file: File, prefix?: string): Promise<string | null> {
    // Try presigned upload first
    const assetId = await uploadWithPresign(file, prefix);
    if (assetId) return assetId;

    // Fallback to direct upload
    const result = await uploadDirect(file, prefix);
    return result?.assetId ?? null;
  }

  /**
   * Upload multiple files in parallel
   * Returns array of assetIds (null for failed uploads)
   */
  async function uploadMany(
    files: Array<{ file: File; prefix?: string }>
  ): Promise<Array<string | null>> {
    return Promise.all(files.map(({ file, prefix }) => upload(file, prefix)));
  }

  return {
    getPresignedUrl,
    uploadToPresignedUrl,
    confirmUpload,
    uploadWithPresign,
    uploadDirect,
    upload,
    uploadMany,
  };
};
