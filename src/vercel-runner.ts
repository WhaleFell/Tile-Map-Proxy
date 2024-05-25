// Running Hono in Vercel.
import app from './index'
import { handle } from '@hono/node-server/vercel'

export default handle(app)
