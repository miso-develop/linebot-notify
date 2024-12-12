export type ChannelAccessToken = {
    channelAccessToken: string;
};
export type ChannelIdAndSecret = {
    channelId: string;
    channelSecret: string;
};
export type ConstructorOption = ChannelAccessToken | ChannelIdAndSecret;
export type RemainingQuota = number | "unlimited";
export type PushOptions = {
    to?: string | string[];
    notificationDisabled?: boolean;
};
export type TextMessage = {
    type: "text";
    text: string;
};
export type EmptyResponse = {};
export type SentMessage = {
    id: number;
    quoteToken: string;
};
export type PushResponse = {
    sentMessages: SentMessage[];
};
export type QuotaLimitedResponse = {
    type: "limited";
    value: number;
};
export type QuotaNoneResponse = {
    type: "none";
};
export type QuotaResponse = QuotaLimitedResponse | QuotaNoneResponse;
export type QuotaConsumptionResponse = {
    totalUsage: number;
};
export type TokenResponse = {
    token_type: "Bearer";
    access_token: string;
    expires_in: number;
};
