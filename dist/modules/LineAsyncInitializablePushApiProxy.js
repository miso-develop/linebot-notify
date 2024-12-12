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
exports.LineAsyncInitializablePushApiProxy = void 0;
const LinePushApi_js_1 = require("./api/LinePushApi.js");
const LineTokenApi_js_1 = require("./api/LineTokenApi.js");
const utils_js_1 = require("../utils/utils.js");
class LineAsyncInitializablePushApiProxy {
    constructor(constructorOption) {
        this._linePushApi = {};
        this._initLinePushApi(constructorOption);
        return (0, utils_js_1.preMethodInterceptor)(this, () => this._initWait());
    }
    _initLinePushApi(constructorOption) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._linePushApi instanceof LinePushApi_js_1.LinePushApi)
                return;
            const channelAccessToken = "channelAccessToken" in constructorOption ?
                constructorOption.channelAccessToken :
                yield this._getToken(constructorOption);
            this._linePushApi = new LinePushApi_js_1.LinePushApi(channelAccessToken);
        });
    }
    _getToken(constructorOption) {
        return __awaiter(this, void 0, void 0, function* () {
            const { channelId, channelSecret } = constructorOption;
            const { access_token } = yield LineTokenApi_js_1.LineTokenApi.getToken(channelId, channelSecret);
            return access_token;
        });
    }
    _initWait() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._linePushApi instanceof LinePushApi_js_1.LinePushApi)
                return;
            const sleepMSec = 50;
            while (!(this._linePushApi instanceof LinePushApi_js_1.LinePushApi))
                yield (0, utils_js_1.sleep)(sleepMSec);
        });
    }
    broadcast(messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._linePushApi.broadcast(messages, notificationDisabled);
        });
    }
    push(to, messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._linePushApi.push(to, messages, notificationDisabled);
        });
    }
    multicast(to, messages, notificationDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._linePushApi.multicast(to, messages, notificationDisabled);
        });
    }
    getQuota() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._linePushApi.getQuota();
        });
    }
    getQuotaConsumption() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._linePushApi.getQuotaConsumption();
        });
    }
}
exports.LineAsyncInitializablePushApiProxy = LineAsyncInitializablePushApiProxy;
