// Running Hono in Vercel.
import app from './index'
import { handle } from '@hono/node-server/vercel'

export const config = {
	supportsResponseStreaming: true,
	runtime: 'nodejs', // or 'nodejs'
	api: {
		badyParse: false,
	},
}

export default handle(app)
