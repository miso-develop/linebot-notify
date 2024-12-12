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
exports.LinePushApi = void 0;
class LinePushApi {
    constructor(channelAccessToken) {
        this._BASE_URL = "https://api.line.me/v2/bot/message/";
        this._channelAccessToken = channelAccessToken;
    }
    _get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this._BASE_URL + path;
            const response = yield fetch(url, {
                headers: {
                    "Authorization": `Bearer ${this._channelAccessToken}`,
                },
            });
            const result = yield response.json();
            if (!response.ok || response.status !== 200)
                throw Error(JSON.stringify(result));
            return result;
        });
    }
    _post(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this._BASE_URL + path;
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this._channelAccessToken}`,
                },
                body: JSON.stringify(body),
            });
            const result = yield response.json();
            if (!response.ok || response.status !== 200)
                throw Error(JSON.stringify(result));
            return result;
        });
    }
    _createTextMessages(messages) {
        return messages.map((message) => ({
            type: "text",
            text: message
        }));
    }
    broadcast(messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                messages: this._createTextMessages(messages),
                notificationDisabled,
            };
            return this._post("broadcast", body);
        });
    }
    push(to, messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                to,
                messages: this._createTextMessages(messages),
                notificationDisabled
            };
            return this._post("push", body);
        });
    }
    multicast(to, messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                to,
                messages: this._createTextMessages(messages),
                notificationDisabled
            };
            return this._post("multicast", body);
        });
    }
    getQuota() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._get("quota");
        });
    }
    getQuotaConsumption() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._get("quota/consumption");
        });
    }
}
exports.LinePushApi = LinePushApi;
