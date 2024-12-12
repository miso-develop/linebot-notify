import type { TokenResponse } from "../../types/types.js"

export class LineTokenApi {
	
	private static async _post(url: string, body: any): Promise<any> {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body,
		})
		
		const result = await response.json()
		if (!response.ok || response.status !== 200) throw Error(JSON.stringify(result))
		
		return result
	}
	
	public static async getToken(channelId: string, channelSecret: string): Promise<TokenResponse> {
		const url = "https://api.line.me/oauth2/v3/token"
		
		const body = new URLSearchParams()
		body.append("grant_type", "client_credentials")
		body.append("client_id", channelId)
		body.append("client_secret", channelSecret)
		
		return this._post(url, body)
	}
	
}
