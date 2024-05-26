// Running Hono in Node.js with an Node.js adapter.
// https://github.com/honojs/node-server
import app from './index'
import { serve } from '@hono/node-server'
import { config } from 'dotenv'
import { env } from 'process'
import { setGlobalDispatcher, ProxyAgent } from 'undici'

config({ path: '.env' })

// https://stackoverflow.com/questions/72306101/make-a-request-in-native-fetch-with-proxy-in-nodejs-18
if (env.https_proxy) {
	console.log(`Using http proxy: ${env.https_proxy}`)
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
	const dispatcher = new ProxyAgent({ uri: new URL(env.https_proxy).toString() })
	setGlobalDispatcher(dispatcher)
}

serve(app, (info) => {
	console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})
