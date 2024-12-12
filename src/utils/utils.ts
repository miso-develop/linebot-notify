export const { log } = console

export const sleep = (msec: number): Promise<void> => new Promise(resolve => setTimeout(resolve, msec))

export const preMethodInterceptor = <T>(that: T, func: Function): T => {
	return new Proxy(that, {
		get: (target: any, prop: string) => {
			const method = target[prop]
			if (typeof method !== "function") return method
			
			return async (...args: any[]) => {
				await func()
				return method.apply(target, args)
			}
		},
	})
}
