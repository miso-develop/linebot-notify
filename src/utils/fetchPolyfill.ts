import * as https from "https"
import * as http from "http"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"

interface FetchOptions {
	method?: HttpMethod
	headers?: Record<string, any>
	body?: string | URLSearchParams
}

interface Response {
	ok: boolean
	status: number
	json: () => Promise<any>
	text: () => Promise<string>
}

export function fetchPolyfill(url: string, options: FetchOptions = {}): Promise<Response> {
	return new Promise((resolve, reject) => {
		const urlObj = new URL(url)
		const isHttps = urlObj.protocol === "https:"
		
		const requestOptions = {
			hostname: urlObj.hostname,
			port: urlObj.port || (isHttps ? 443 : 80),
			path: urlObj.pathname + urlObj.search,
			method: options.method || "GET",
			headers: options.headers || {},
		}
		
		let body: string | null = null
		if (options.body) {
			if (typeof options.body !== "string") {
				body = options.body.toString()
				requestOptions.headers["Content-Length"] = Buffer.byteLength(body)
			} else {
				body = options.body
				requestOptions.headers["Content-Length"] = Buffer.byteLength(body)
			}
		}
		
		const reqModule = isHttps ? https : http
		const req = reqModule.request(requestOptions, (res) => {
			let data = ""
			res.on("data", (chunk) => (data += chunk))
			
			res.on("end", () => {
				const response: Response = {
					ok: res.statusCode! >= 200 && res.statusCode! < 300,
					status: res.statusCode!,
					json: () => Promise.resolve(JSON.parse(data)),
					text: () => Promise.resolve(data),
				}
				resolve(response)
			})
		})
		
		req.on("error", reject)
		
		if (body) req.write(body)
		
		req.end()
	})
}
