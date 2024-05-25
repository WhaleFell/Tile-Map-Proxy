// Running Hono in Vercel.
import app from '@/index'
import { handle } from '@hono/node-server/vercel'

// Run it on the Vercel edge
export default handle(app)
