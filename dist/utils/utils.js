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
exports.preMethodInterceptor = exports.sleep = exports.log = void 0;
exports.log = console.log;
const sleep = (msec) => new Promise(resolve => setTimeout(resolve, msec));
exports.sleep = sleep;
const preMethodInterceptor = (that, func) => {
    return new Proxy(that, {
        get: (target, prop) => {
            const method = target[prop];
            if (typeof method !== "function")
                return method;
            return (...args) => __awaiter(void 0, void 0, void 0, function* () {
                yield func();
                return method.apply(target, args);
            });
        },
    });
};
exports.preMethodInterceptor = preMethodInterceptor;
