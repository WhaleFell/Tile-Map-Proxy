// Running Hono in Node.js with an Node.js adapter.
// https://github.com/honojs/node-server
import app from "./index"
import { serve } from "@hono/node-server"
import { setGlobalDispatcher, ProxyAgent } from "undici"
import { config } from "dotenv"

// standard node modules
import path from "path"
import { env } from "process"
import { existsSync } from "fs"

// disable console logs in production
// use esbuild to remove console logs in production
// esbuild --drop:debugger --drop:console
// if (process.env.NODE_ENV == 'production') {
// 	console.log = () => {}
// 	console.error = () => {}
// 	console.debug = () => {}
// }

// In node 20, we can use `node --env-file .env` to load env variables from a file
// so not needed to load dotenv

// if .env file is detected, load it
const envFilePath = path.resolve(".env")
console.log(`.env file path: ${envFilePath}`)

// 判断 .env 文件是否存在
if (existsSync(envFilePath)) {
  // 加载 .env 文件中的环境变量
  config({ path: envFilePath })
  console.log(".env file found and loaded")
} else {
  console.log(".env file not found")
}

// set global dispatcher to use proxy in fetch
// https://stackoverflow.com/questions/72306101/make-a-request-in-native-fetch-with-proxy-in-nodejs-18
if (env.HTTP_PROXY) {
  console.log(`Using http proxy: ${env.HTTP_PROXY}`)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  const dispatcher = new ProxyAgent({ uri: new URL(env.HTTP_PROXY).toString() })
  setGlobalDispatcher(dispatcher)
}

console.log(`NODE_ENV: ${env.NODE_ENV}`)

serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT) ? Number(env.PORT) : 3000,
    hostname: env.HOST || "0.0.0.0"
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`)
  }
)
