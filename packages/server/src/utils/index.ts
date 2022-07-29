/*
 * @Date: 2021-02-02 14:58:47
 * @LastEditors: seven.sun seven0_0@126.com
 * @LastEditTime: 2022-07-29 15:50:50
 */

/**
 * 获取类名
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
