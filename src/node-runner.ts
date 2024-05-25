// Running Hono in Node.js with an Node.js adapter.
// https://github.com/honojs/node-server
import app from '@/index'
import { serve } from '@hono/node-server'

serve(app, (info) => {
	console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})
