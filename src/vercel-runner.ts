// Running Hono in Vercel.
import app from './index'
import { handle } from '@hono/node-server/vercel'

// https://github.com/vercel/ai/issues/239#issuecomment-1636264346
// NOTE:
// Ugly implementation, using the `addConfig.js` script to add the config file to the compiled JS, because esbuild turns const into var, causing vercel to not read the config correctly.
// export const config = {
// 	supportsResponseStreaming: true,
// 	api: {
// 		badyParse: false,
// 	},
// }
// export const dynamic = 'force-dynamic'

export default handle(app)
