import type { ConstructorOption, RemainingQuota, PushOptions } from "../types/types.js";
export declare class LineBotNotify {
    private _linePushApi;
    constructor(constructorOption: ConstructorOption);
    getRemainingQuota(): Promise<RemainingQuota>;
    push(message: string, pushOptions?: PushOptions): Promise<RemainingQuota>;
}
