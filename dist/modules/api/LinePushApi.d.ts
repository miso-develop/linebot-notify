import type { LinePushApiInterface } from "../../types/LinePushApiInterface.js";
import type { EmptyResponse, PushResponse, QuotaResponse, QuotaConsumptionResponse } from "../../types/types.js";
export declare class LinePushApi implements LinePushApiInterface {
    private _channelAccessToken;
    private _BASE_URL;
    constructor(channelAccessToken: string);
    private _get;
    private _post;
    private _createTextMessages;
    broadcast(messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>;
    push(to: string, messages: string[], notificationDisabled?: boolean): Promise<PushResponse>;
    multicast(to: string[], messages: string[], notificationDisabled?: boolean): Promise<EmptyResponse>;
    getQuota(): Promise<QuotaResponse>;
    getQuotaConsumption(): Promise<QuotaConsumptionResponse>;
}
