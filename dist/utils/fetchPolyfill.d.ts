type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
interface FetchOptions {
    method?: HttpMethod;
    headers?: Record<string, any>;
    body?: string | URLSearchParams;
}
interface Response {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
    text: () => Promise<string>;
}
export declare function fetchPolyfill(url: string, options?: FetchOptions): Promise<Response>;
export {};
