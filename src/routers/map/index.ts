import { Hono } from "hono"
import { MapSourceList } from "./mapSources"
import { defaultMapHandler } from "./mapHandlers"

// common cache middleware
import { commonCacheMiddleware } from "@/lib/middleware"
import { cacheUtil, FileSystemCache } from "@/lib/cache"

const mapRoute = new Hono()

mapRoute.use("/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}", commonCacheMiddleware())

mapRoute.get("/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}", async (c) => {
  const { type, x, y, z }: MapParams = c.req.param()
  const mapSource = MapSourceList.find((s) => s.type === type)
  if (!mapSource) {
    return c.json({ error: `Map type ${type} not found!` }, 404)
  }
  const handler: MapSource["handler"] = mapSource.handler || defaultMapHandler
  const response = await handler(mapSource.url, { type, x, y, z })
  return response
})

mapRoute.get("/list", async (c) => {
  const url = new URL(c.req.url)
  const hostname = url.origin

  const result = MapSourceList.map((map: MapSource) => {
    return {
      name: map.name,
      type: map.type,
      url: `${hostname}/map/${map.type}/{x}/{y}/{z}`
    }
  })

  return c.json(result)
})

mapRoute.get("/clear_cache", async (c) => {
  if (cacheUtil instanceof FileSystemCache) {
    const result = await cacheUtil.removeAllCache()
    return c.json({
      code: result ? 1 : 0,
      msg: result ? "Cache cleared!" : "Failed to clear cache!"
    })
  }
  return c.json({
    code: 0,
    msg: "Cache clear not implemented!"
  })
})

export default mapRoute
