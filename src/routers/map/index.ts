import { Hono } from 'hono'
// import { cache } from 'hono/cache'
import { MapSourceList } from './mapSources'
import { defaultMapHandler } from './mapHandlers'

const mapRoute = new Hono()

// const cacheMiddleware = cache({
// 	cacheName: 'map',
// 	keyGenerator: (c) => c.req.url,
// 	cacheControl: 'max-age=3600',
// 	wait: false,
// })

mapRoute.get('/:type/:x{[0-9]+}/:y{[0-9]+}/:z{[0-9]+}', async (c) => {
	const { type, x, y, z }: MapParams = c.req.param()
	const mapSource = MapSourceList.find((s) => s.type === type)
	if (!mapSource) {
		return c.json({ error: `Map type ${type} not found!` }, 404)
	}
	const handler: MapSource['handler'] = mapSource.handler || defaultMapHandler
	const response = await handler(mapSource.url, { type, x, y, z })
	return response
})

mapRoute.get('/list', async (c) => {
	const url = new URL(c.req.url)
	const hostname = url.origin

	const result = MapSourceList.map((map: MapSource) => {
		return {
			name: map.name,
			type: map.type,
			url: `${hostname}/map/${map.type}/{x}/{y}/{z}`,
		}
	})

	return c.json(result)
})

export default mapRoute
