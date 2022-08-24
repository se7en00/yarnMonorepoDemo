/*
 * @Date: 2021-02-02 14:58:47
 * @LastEditors: seven.sun seven0_0@126.com
 * @LastEditTime: 2022-08-20 08:00:12
 */

import { middlewareAdaptee } from "@server/interfaces"
import type { Context, Next, Middleware } from "koa"

/**
 * @description: get
 * @param {any} target
 * @return {*}
 */
export const getClassName = (target: any) => {
    return typeof target === "function" ? target.name : target.constructor.name
}

/**
 *  获取类
 * @param target
 */
export const getClass = (target: any): any => {
    return target.prototype ? target : target.constructor
}

/**
 * 获取该属性的描述对象
 * @param target 类
 * @param propertyKey 目标属性
 */
export const descriptorOf = (target: any, propertyKey: string): PropertyDescriptor | undefined => {
    return Reflect.getOwnPropertyDescriptor((target && target.prototype) || target, propertyKey)
}

export const koaMiddlewareAdapter =
    (adaptee: middlewareAdaptee): Middleware =>
    async (ctx: Context, next: Next) => {
        const { target, key, middleware, callback } = adaptee
        const middlewareFn = middleware.bind(target)
        key ? middlewareFn(...callback(key, ctx, next), ctx, next) : middlewareFn(ctx, next)
    }
