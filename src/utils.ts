import { Handler } from 'hono'

const generateHeaders = (url: string): HeadersInit => {
	const copiedURL = new URL(url)

	return {
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
	}
}

export const customFetch = async (url: string, options?: RequestInit, timeout: number = 8000): Promise<Response> => {
	const retryLimit = 3
	let retries = 0
	let error
	const mergedHeaders = { ...generateHeaders(url), ...options?.headers }
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
