import type { LinePushApiInterface } from "../types/LinePushApiInterface.js";
import type { ConstructorOption, EmptyResponse, PushResponse, QuotaResponse, QuotaConsumptionResponse } from "../types/types.js";
export declare class LineAsyncInitializablePushApiProxy implements LinePushApiInterface {
    private _linePushApi;
    constructor(constructorOption: ConstructorOption);
    private _initLinePushApi;
    private _getToken;
    private _initWait;
    broadcast(messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>;
    push(to: string, messages: string[], notificationDisabled?: boolean): Promise<PushResponse>;
    multicast(to: string[], messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>;
    getQuota(): Promise<QuotaResponse>;
    getQuotaConsumption(): Promise<QuotaConsumptionResponse>;
}
