// default router
import { Hono } from 'hono'
import { getRuntimeKey } from 'hono/adapter'
import { validator } from 'hono/validator'
import { StatusCode } from 'hono/utils/http-status'
import { delHeaderLengthMiddleware, customFetch } from '../utils'

const defaultRoute = new Hono()

defaultRoute.get('/ping', (c) => {
	return c.text('pong', 200)
})

defaultRoute.get('/runtime', (c) => {
	return c.json({ runtime: getRuntimeKey() })
})

const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

const validatorURLMiddleware = validator('query', (value, c) => {
	if (typeof value.url !== 'string') {
		return c.json({ error: `Invalid URL ${value.url}` }, 400)
	}

	if (!URL_REGEX.test(value.url)) {
		return c.json({ error: `Invalid URL ${value.url}` }, 400)
	}

	return {
		url: value.url,
	}
})

defaultRoute.all('/proxy', validatorURLMiddleware, delHeaderLengthMiddleware, async (c) => {
	const url = c.req.valid('query').url
	console.log(`[defaultRoute] Fetching data from ${url}...`)
	const rep = await customFetch(url, { headers: c.req.raw.headers, method: c.req.method })
	return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

defaultRoute.get('/speedtest', async (c) => {
	const url = 'http://lg-tok.fdcservers.net/10GBtest.zip'
	const rep = await customFetch(url, { headers: c.req.raw.headers, method: 'get' })
	console.log(`[defaultRoute] Speedtest from ${url}...`)
	return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

export default defaultRoute
