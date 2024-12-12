import type { LinePushApiInterface } from "../../types/LinePushApiInterface.js"
import type { EmptyResponse, PushResponse, QuotaResponse, QuotaConsumptionResponse, TextMessage } from "../../types/types.js"

export class LinePushApi implements LinePushApiInterface {
	
	private _channelAccessToken: string
	
	private _BASE_URL = "https://api.line.me/v2/bot/message/" as const
	
	constructor(channelAccessToken: string) {
		this._channelAccessToken = channelAccessToken
	}
	
	
	
	private async _get(path: string): Promise<any> {
		const url = this._BASE_URL + path
		const response = await fetch(url, {
			headers: {
				"Authorization": `Bearer ${this._channelAccessToken}`,
			},
		})
		
		const result = await response.json()
		if (!response.ok || response.status !== 200) throw Error(JSON.stringify(result))
			
		return result
	}
	
	private async _post(path: string, body: any): Promise<any> {
		const url = this._BASE_URL + path
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this._channelAccessToken}`,
			},
			body: JSON.stringify(body),
		})
		
		const result = await response.json()
		if (!response.ok || response.status !== 200) throw Error(JSON.stringify(result))
		
		return result
	}
	
	private _createTextMessages(messages: string[]): TextMessage[] {
		return messages.map((message) => ({
			type: "text",
			text: message
		}))
	}
	
	
	
	public async broadcast(messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse> {
		const body = {
			messages: this._createTextMessages(messages),
			notificationDisabled,
		}
		return this._post("broadcast", body)
	}
	
	public async push(to: string, messages: string[], notificationDisabled?: boolean): Promise<PushResponse> {
		const body = {
			to,
			messages: this._createTextMessages(messages),
			notificationDisabled
		}
		return this._post("push", body)
	}
	
	public async multicast(to: string[], messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse> {
		const body = {
			to,
			messages: this._createTextMessages(messages),
			notificationDisabled
		}
		return this._post("multicast", body)
	}
	
	
	
	public async getQuota(): Promise<QuotaResponse> {
		return this._get("quota")
	}
	
	public async getQuotaConsumption(): Promise<QuotaConsumptionResponse> {
		return this._get("quota/consumption")
	}
	
}


