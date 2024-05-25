// exception handler
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const exceptionHandler = (app: Hono) => {
	// Error handling
	app.onError((err, c) => {
		if (err instanceof HTTPException) {
			c.status(err.status)
			const headers = err.res?.headers
			return c.json({ error: err.message || err.res?.statusText }, err.status, headers ? Object.fromEntries(headers) : {})
		}
		console.error(`${err}`)
		return c.json({ error: `Error Occur ${err}` }, 500)
	})

	app.notFound((c) => {
		return c.json({ error: `Not Found ${c.req.raw.url}` }, 404)
	})
}
