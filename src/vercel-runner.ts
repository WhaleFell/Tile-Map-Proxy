// Running Hono in Vercel.
import app from '@/index'
import { handle } from 'hono/vercel'

// Run it on the Vercel edge
export const config = {
	runtime: 'edge',
}

export default handle(app)
