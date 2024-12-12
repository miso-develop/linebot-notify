import { LineAsyncInitializablePushApiProxy } from "./LineAsyncInitializablePushApiProxy.js"
import type { LinePushApiInterface } from "../types/LinePushApiInterface.js"
import type { ConstructorOption, RemainingQuota, PushOptions } from "../types/types.js"

// @ts-ignore
if (!global.fetch) global.fetch = async (...args) => (await import("../utils/fetchPolyfill.js")).fetchPolyfill(...args)



const ERROR_MESSAGES = {
	INVALID_TO_OPTION_MESSAGE: "Invalid 'to' option in pushOptions: recipient must be undefined, a string (for single recipient), or an array of strings (for multiple recipients).",
} as const



export class LineBotNotify {
	
	private _linePushApi: LinePushApiInterface = {} as LinePushApiInterface
	
	constructor(constructorOption: ConstructorOption) {
		this._linePushApi = new LineAsyncInitializablePushApiProxy(constructorOption)
	}
	
	public async getRemainingQuota(): Promise<RemainingQuota> {
		const results = await Promise.all([
			this._linePushApi.getQuota(),
			this._linePushApi.getQuotaConsumption(),
		])
		
		if (results[0].type === "none") return "unlimited"
		
		const remainingQuota = results[0].value - results[1].totalUsage
		return remainingQuota
	}
	
	public async push(
		message: string,
		pushOptions?: PushOptions,
	): Promise<RemainingQuota> {
		const defaultOptions = {
			notificationDisabled: false,
		}
		const { to, notificationDisabled } = { ...defaultOptions, ...pushOptions }
		
		const pushMethod =
			typeof to === "undefined" ? () => this._linePushApi.broadcast([message], notificationDisabled) :
			typeof to === "string" ? () => this._linePushApi.push(to, [message], notificationDisabled) :
			Array.isArray(to) ? () => this._linePushApi.multicast(to, [message], notificationDisabled) :
				undefined
		if (!pushMethod) throw Error(ERROR_MESSAGES.INVALID_TO_OPTION_MESSAGE)
		await pushMethod()
		
		const remainingQuota = await this.getRemainingQuota()
		return remainingQuota
	}
	
}
