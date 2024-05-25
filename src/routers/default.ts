// default router
import { Hono } from 'hono'
import { getRuntimeKey } from 'hono/adapter'
import { StatusCode } from 'hono/utils/http-status'
import { delHeaderLengthMiddleware, customFetch } from '../utils'

const defaultRoute = new Hono()

defaultRoute.get('/ping', (c) => {
	return c.text('pong', 200)
})

defaultRoute.get('/runtime', (c) => {
	return c.json({ runtime: getRuntimeKey() })
})

defaultRoute.all('/proxy/:url{.*?}', delHeaderLengthMiddleware, async (c) => {
	const url = c.req.param('url')
	console.log(`[defaultRoute] Fetching data from ${url}...`)
	const rep = await customFetch(url, { headers: c.req.raw.headers, method: c.req.method })
	return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

export default defaultRoute
