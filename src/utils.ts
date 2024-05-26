import { Handler } from 'hono'

export const generateHeaders = (url: string): HeadersInit => {
	const copiedURL = new URL(url)

	return new Headers({
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
		Origin: copiedURL.host,
		Referer: copiedURL.origin,
		Accept:
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'en-US,en;q=0.9',
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		Connection: 'keep-alive',
		'Upgrade-Insecure-Requests': '1',
	})
}

function isObject(value: any) {
	return value !== null && typeof value === 'object'
}

export function mergeHeaders(...sources: HeadersInit[]) {
	const result: any = {}

	for (const source of sources) {
		if (!isObject(source)) {
			throw new TypeError('All arguments must be of type object')
		}

		const headers: Headers = new Headers(source)

		for (const [key, value] of headers.entries()) {
			if (value === undefined || value === 'undefined') {
				delete result[key]
			} else {
				result[key] = value
			}
		}
	}

	return new Headers(result)
}

// TODO: hono fetch issue: TypeError: Response body object should not be disturbed or locked
// https://github.com/honojs/hono/issues/1695
export const customFetch = async (url: string, options?: RequestInit, timeout: number = 8000): Promise<Response> => {
	const retryLimit = 3
	let retries = 0
	let error
	const mergedHeaders = mergeHeaders(generateHeaders(url), options?.headers ? options.headers : {})
	console.log(`[customFetch] ${url} Fetching data...`)
	while (retries < retryLimit) {
		try {
			// const response = await fetch(url, options)
			const response = await Promise.race([
				fetch(url, { ...options, headers: mergedHeaders }),
				new Promise((_, reject) => setTimeout(() => reject('TIMEOUT'), timeout)),
			])

			if (response) {
				return response as Response
			}
			retries++
		} catch (error) {
			error = error
			console.error(`[customFetch] ${url} Failed to fetch data: ${error} and retrying...`)
			retries++
		}
	}
	throw new Error(`[customFetch] ${url} Failed to fetch data after ${retries} retries reason: ${error}`)
}

export const delHeaderLengthMiddleware: Handler = async (c, next) => {
	await next()
	console.log('[delHeaderLengthMiddleware] Deleting Content-Length header...')
	c.res.headers.delete('content-length')
	c.res.headers.delete('content-encoding')
}
