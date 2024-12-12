import { EmptyResponse, PushResponse, QuotaResponse, QuotaConsumptionResponse, } from "./types.js"

export interface LinePushApiInterface {
	broadcast(messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>
	push(to: string, messages: string[], notificationDisabled?: boolean): Promise<PushResponse>
	multicast(to: string[], messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>
	getQuota(): Promise<QuotaResponse>
	getQuotaConsumption(): Promise<QuotaConsumptionResponse>
}
