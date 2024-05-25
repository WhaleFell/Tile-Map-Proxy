// import { serveStatic } from 'hono/cloudflare-workers'
import { Hono } from 'hono'

// custom
import { exceptionHandler } from '@/exception'
import defaultRoute from '@/routers/default'
import mapRoute from '@/routers/map'
import { renderHTML, renderItems } from '@/HTMLRender'
import { MapSourceList } from './routers/map/mapSources'

const app = new Hono({ strict: false })

app.get('/', (c) => {
	const url = new URL(c.req.url)
	const hostname = url.origin
	return c.html(renderHTML('items', renderItems(MapSourceList, hostname)))
})

// app.get('/favicon.ico', serveStatic({ path: 'favicon.ico', manifest: {} }))

// exception handler
exceptionHandler(app)

// add custom routes here
app.route('/', defaultRoute)
app.route('/map', mapRoute)

export default app
