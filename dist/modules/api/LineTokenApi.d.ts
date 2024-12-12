import type { TokenResponse } from "../../types/types.js";
export declare class LineTokenApi {
    private static _post;
    static getToken(channelId: string, channelSecret: string): Promise<TokenResponse>;
}
