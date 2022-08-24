import { getClassName } from "@server/utils"
import type { Context, Next } from "koa"

export interface ParamsMapValue {
    // 参数序号
    parameterIndex: number
    // 请求方式
    paramsType: ParamsType
    // 参数名(切记，不是修饰的参数名，而是挂载在request上的属性)
    paramsKey: string
}

export enum ParamsType {
    QUERYPARAMS = "query",
    BODYPARAMS = "body",
    PATHPARAMS = "path",
    REQUEST = "request",
    RESPONSE = "response",
    NEXT = "next",
    HEADERPARAMS = "header",
    ERROR = "error"
}

export class ParamsService {
    static paramsMap: Map<string, ParamsMapValue[]> = new Map()

    /**
     * 拼接 paramsMap key值
     * @param target
     * @param propertyKey
     */
    static fomartParamsMapKey(target: any, propertyKey: string) {
        return `${getClassName(target)}_${propertyKey}`
    }

    /**
     * 返回参数序列
     * @param paramsMapKey
     * @param ctx
     */
    paramsToList(paramsMapKey: string, ctx: Context, next: Next) {
        // 不存在key值时直接返回一个空数组
        if (!ParamsService.paramsMap.has(paramsMapKey)) return []
        return ParamsService.paramsMap.get(paramsMapKey)!.map(item => {
            switch (item.paramsType) {
                case ParamsType.PATHPARAMS:
                    // path
                    return ctx.params[item.paramsKey]
                case ParamsType.QUERYPARAMS:
                    // query
                    return ctx.request.query[item.paramsKey]
                case ParamsType.BODYPARAMS:
                    // body
                    return item.paramsKey ? ctx.request.body[item.paramsKey] : ctx.request.body
                case ParamsType.REQUEST:
                    // request
                    return ctx.req
                case ParamsType.RESPONSE:
                    // response
                    return ctx.response
                case ParamsType.NEXT:
                    // next
                    return next
                case ParamsType.HEADERPARAMS:
                    // header
                    return item.paramsKey ? ctx.request.headers[item.paramsKey] : ctx.request.headers
                default:
                    break
            }
        })
    }
}
