/**
 * Escapes a cache key to match Nitro's internal key normalization.
 * Removes non-alphanumeric characters (e.g., `/`, `-`) for compatibility
 * across storage backends.
 *
 * @param key - The cache key or array of keys to escape
 * @returns The normalized/escaped key string
 *
 * @example
 * escapeKey('/api/products/sale-items') // 'apiproductssaleitems'
 * escapeKey('product/123/details') // 'product123details'
 */
export function escapeKey(key: string | string[]): string {
  return String(key).replace(/\W/g, '')
}

/**
 * Generates a full cache key for cached functions.
 * Uses the pattern: `${group}:${name}:${key}.json`
 *
 * @param options - Configuration for the cache key
 * @param options.name - The function/handler name
 * @param options.key - The specific key (will be escaped)
 * @param options.group - The cache group (defaults to 'nitro')
 * @param options.type - The cache type: 'functions', 'handlers', or 'routes' (defaults to 'functions')
 * @returns The full cache key string
 *
 * @example
 * getCacheKey({ name: 'getAccessToken', key: 'default' })
 * // 'nitro:functions:getAccessToken:default.json'
 *
 * getCacheKey({ name: 'products', key: 'product/123/details', type: 'handlers' })
 * // 'nitro:handlers:products:product123details.json'
 */
export function getCacheKey(options: {
  name: string
  key: string
  group?: string
  type?: 'functions' | 'handlers' | 'routes'
}): string {
  const { name, key, group = 'nitro', type = 'functions' } = options
  const normalizedKey = escapeKey(key);
  return `${group}:${type}:${name}:${normalizedKey}.json`
}

/**
 * Invalidates a specific cache entry by removing it from storage.
 *
 * @param options - Configuration for cache invalidation
 * @param options.name - The function/handler name
 * @param options.key - The specific key to invalidate
 * @param options.group - The cache group (defaults to 'nitro')
 * @param options.type - The cache type (defaults to 'functions')
 *
 * @example
 * await invalidateCacheEntry({ name: 'getAccessToken', key: 'default' })
 * await invalidateCacheEntry({ name: 'products', key: 'product/123', type: 'handlers' })
 */
export async function invalidateCacheEntry(options: {
  name: string
  key: string
  group?: string
  type?: 'functions' | 'handlers' | 'routes'
}): Promise<void> {
  const cacheKey = getCacheKey(options);
  await useStorage('cache').removeItem(cacheKey)
}

/**
 * Invalidates all cache entries with a given prefix.
 * Useful for clearing all entries for a specific handler or function.
 *
 * @param prefix - The cache key prefix to clear (e.g., 'nitro:handlers', 'nitro:functions:getProducts')
 *
 * @example
 * // Clear all handler caches
 * await invalidateCacheByPrefix('nitro:handlers')
 *
 * // Clear all caches for a specific function
 * await invalidateCacheByPrefix('nitro:functions:getProducts')
 */
export async function invalidateCacheByPrefix(prefix: string): Promise<void> {
  await useStorage('cache').clear(prefix)
}

/**
 * Gets a cache key prefix for a specific function or handler.
 * Useful for batch invalidation operations.
 *
 * @param options - Configuration for the prefix
 * @param options.name - The function/handler name
 * @param options.group - The cache group (defaults to 'nitro')
 * @param options.type - The cache type (defaults to 'functions')
 * @returns The cache key prefix
 *
 * @example
 * getCacheKeyPrefix({ name: 'getProducts' })
 * // 'nitro:functions:getProducts'
 */
export function getCacheKeyPrefix(options: {
  name: string
  group?: string
  type?: 'functions' | 'handlers' | 'routes'
}): string {
  const { name, group = 'nitro', type = 'functions' } = options
  return `${group}:${type}:${name}`
}
