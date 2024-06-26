// cache module
import fs from "node:fs"
import { Readable } from "node:stream"
import crypto from "crypto"
import { put, head } from "@vercel/blob"
import { getRuntimeKey } from "hono/adapter"
export const RUNTIME = getRuntimeKey()

export interface CacheInterface<CacheType = ReadableStream, ReturnType = ReadableStream> {
  keyGenerator(name: string): string
  get(name: string): Promise<ReturnType | null>
  put(name: string, value: CacheType): Promise<boolean>
}

export class FileSystemCache implements CacheInterface<ReadableStream> {
  private cacheDir: string
  // get script path
  private runPath: string = process.cwd()

  constructor(cacheDir?: string) {
    this.cacheDir = cacheDir ? cacheDir : `${this.runPath}/.cache`
    this.mkCacheDir()
  }

  private async isFileExist(this: this, path: string): Promise<boolean> {
    try {
      await fs.promises.access(path)
      return true
    } catch (error) {
      return false
    }
  }

  private mkCacheDir() {
    // mkdir ./cache if not exists
    fs.promises
      .access(this.cacheDir)
      .then(() => {
        console.log(`Cache directory found. ${this.cacheDir}`)
      })
      .catch(() => {
        console.log("Cache directory not found, creating...")
        fs.promises.mkdir(this.cacheDir).then(() => {
          console.log("Cache directory created.")
        })
      })
  }

  keyGenerator(this: this, name: string): string {
    const hash = crypto.createHash("md5").update(name).digest("hex")
    return hash
  }

  async get(name: string): Promise<ReadableStream | null> {
    const cacheKey = this.keyGenerator(name)
    const cachePath = `${this.cacheDir}/${cacheKey}`
    if (!(await this.isFileExist(cachePath))) {
      console.log(`Cache not found: ${cachePath}`)
      return null
    }
    try {
      const fileReadStream = fs.createReadStream(cachePath)
      fileReadStream.on("error", (error) => {
        console.log(`Failed to read cache: ${cachePath}`)
        return null
      })
      return fileReadStream as unknown as ReadableStream
    } catch (error) {
      console.log(`Failed to get cache: ${cachePath}`)
      return null
    }
  }

  // https://stackoverflow.com/questions/73338326/how-can-i-save-a-file-i-download-using-fetch-with-fs
  // Web streams are something new, and they are different way of handling streams.
  async put(name: string, value: ReadableStream<any> | null): Promise<boolean> {
    if (!value) {
      return false
    }
    const cacheKey = this.keyGenerator(name)
    const cachePath = `${this.cacheDir}/${cacheKey}`
    const webReadableStream = Readable.fromWeb(value as any)
    try {
      const writableStream = fs.createWriteStream(cachePath)
      writableStream.on("error", (error) => {
        console.log(`Failed to write cache: ${cachePath}`)
      })
      webReadableStream.pipe(writableStream as any)
      return true
    } catch (error) {
      console.log(`Failed to set cache: ${cachePath}`)
      return false
    }
  }

  async removeAllCache() {
    try {
      await fs.promises.rm(this.cacheDir, { recursive: true })
      return true
    } catch (error) {
      console.log(`Failed to remove cache: ${this.cacheDir}`)
      return false
    } finally {
      this.mkCacheDir()
    }
  }
}

export class vercelBlobCache implements CacheInterface<ReadableStream, Response> {
  keyGenerator(this: this, name: string): string {
    return name
  }

  async get(name: string): Promise<Response | null> {
    const cacheKey = this.keyGenerator(name)
    try {
      const blob = await head(cacheKey)
      if (blob.url) {
        // directly return the blob url
        return Response.redirect(blob.url, 302)
      }
      return null
    } catch (error) {
      console.log(`Failed to get vercel blob cache: ${cacheKey} ${error}`)
      return null
    }
  }

  async put(name: string, value: ReadableStream<any>): Promise<boolean> {
    const cacheKey = this.keyGenerator(name)
    try {
      const blob = await put(`${cacheKey}.png`, value, { access: "public", addRandomSuffix: false })
      return true
    } catch (error) {
      console.log(`Failed to set vercel blob cache: ${cacheKey} ${error}`)
      return false
    }
  }
}

// create cache util based on runtime
export const newCacheUtil = () => {
  if (process.env.isVercel) {
    console.log("Detect isVercel=True, use vercelBlobCache")
    return new vercelBlobCache()
  }
  if (RUNTIME === "node") {
    console.log("Detect running in NodeJS, use FileSystemCache")
    return new FileSystemCache()
  }

  return {
    keyGenerator: (name: string) => name,
    get: async (...args) => null,
    put: async (...args) => false
  } as CacheInterface
}

export const cacheUtil = newCacheUtil()
