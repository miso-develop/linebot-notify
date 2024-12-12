"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTokenApi = void 0;
class LineTokenApi {
    static _post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body,
            });
            const result = yield response.json();
            if (!response.ok || response.status !== 200)
                throw Error(JSON.stringify(result));
            return result;
        });
    }
    static getToken(channelId, channelSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://api.line.me/oauth2/v3/token";
            const body = new URLSearchParams();
            body.append("grant_type", "client_credentials");
            body.append("client_id", channelId);
            body.append("client_secret", channelSecret);
            return this._post(url, body);
        });
    }
}
exports.LineTokenApi = LineTokenApi;
