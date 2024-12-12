import { LinePushApi } from "./api/LinePushApi.js"
import { LineTokenApi } from "./api/LineTokenApi.js"
import { sleep, preMethodInterceptor } from "../utils/utils.js"
import type { LinePushApiInterface } from "../types/LinePushApiInterface.js"
import type { ConstructorOption, ChannelIdAndSecret, EmptyResponse, PushResponse, QuotaResponse, QuotaConsumptionResponse } from "../types/types.js"

export class LineAsyncInitializablePushApiProxy implements LinePushApiInterface {
	
	private _linePushApi: LinePushApi = {} as LinePushApi
	
	constructor(constructorOption: ConstructorOption) {
		this._initLinePushApi(constructorOption)
		return preMethodInterceptor<this>(this, () => this._initWait())
	}
	
	private async _initLinePushApi(constructorOption: ConstructorOption): Promise<void> {
		if (this._linePushApi instanceof LinePushApi) return
		
		const channelAccessToken = "channelAccessToken" in constructorOption ?
			constructorOption.channelAccessToken :
			await this._getToken(constructorOption)
		
		this._linePushApi = new LinePushApi(channelAccessToken)
	}
	
	private async _getToken(constructorOption: ChannelIdAndSecret): Promise<string> {
		const { channelId, channelSecret } = constructorOption
		const { access_token } = await LineTokenApi.getToken(channelId, channelSecret)
		return access_token
	}
	
	private async _initWait(): Promise<void> {
		if (this._linePushApi instanceof LinePushApi) return
		
		const sleepMSec = 50
		while (!(this._linePushApi as any instanceof LinePushApi)) await sleep(sleepMSec)
	}
	
	
	
	public async broadcast(messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse> {
		return this._linePushApi.broadcast(messages, notificationDisabled)
	}
	
	public async push(to: string, messages: string[], notificationDisabled?: boolean): Promise<PushResponse> {
		return this._linePushApi.push(to, messages, notificationDisabled)
	}
	
	public async multicast(to: string[], messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse> {
		return this._linePushApi.multicast(to, messages, notificationDisabled)
	}
	
	public async getQuota(): Promise<QuotaResponse> {
		return this._linePushApi.getQuota()
	}
	
	public async getQuotaConsumption(): Promise<QuotaConsumptionResponse> {
		return this._linePushApi.getQuotaConsumption()
	}
	
}
