import { createMiddleware } from "hono/factory"
import { MiddlewareHandler } from "hono"
import { cache } from "hono/cache"

// cache
import { cacheUtil, RUNTIME, vercelBlobCache, FileSystemCache } from "./cache"

const fileSystemCacheMiddleware = createMiddleware(async (c, next) => {
  cacheUtil as FileSystemCache
  // check exist cache
  let existCache = (await cacheUtil.get(c.req.url)) as ReadableStream
  if (existCache) {
    console.log(`Cache hit: ${c.req.url}`)
    return c.newResponse(existCache)
  }
  await next()

  // save response to cache
  const clonedResponse = c.res.clone()
  if (clonedResponse.status === 200 && clonedResponse.body) {
    await cacheUtil.put(c.req.url, clonedResponse.body)
  }
})

const vercelBlobCacheMiddleware = createMiddleware(async (c, next) => {
  // check exist cache
  cacheUtil as vercelBlobCache
  let existCache = (await cacheUtil.get(c.req.url)) as Response
  if (existCache) {
    console.log(`vercelBlob Cache hit: ${c.req.url}`)
    return existCache
  }
  await next()

  // save response to cache
  const clonedResponse = c.res.clone()
  if (clonedResponse.status === 200 && clonedResponse.body) {
    await cacheUtil.put(c.req.url, clonedResponse.body)
  }
})

export const commonCacheMiddleware = (): MiddlewareHandler => {
  if (RUNTIME === "workerd") {
    return cache({
      cacheName: "map",
      keyGenerator: (c) => c.req.url,
      cacheControl: "max-age=3600",
      wait: false
    })
  }
  if (process.env.isVercel) {
    return vercelBlobCacheMiddleware
  }
  return fileSystemCacheMiddleware
}
