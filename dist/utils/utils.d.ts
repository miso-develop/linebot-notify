export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare const sleep: (msec: number) => Promise<void>;
export declare const preMethodInterceptor: <T>(that: T, func: Function) => T;
