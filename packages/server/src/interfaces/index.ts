import type { Context, Next } from "koa"

export * from "./type.interface"
export * from "./serverSetting.interface"
export * from "./routerPathConfig.interface"

export interface middlewareAdaptee {
    target: any
    middleware: (...args: any[]) => Promise<any>
    key?: string
    callback: (key: string, ctx: Context, next: Next) => any[]
}
