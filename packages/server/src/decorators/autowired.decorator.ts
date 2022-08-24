/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "@server/common"
/**
 * 注入service，类属性修饰器
 * @param params 实例化参数
 */
export const Autowired = (...params: any[]) => {
    return (target: any, propertyKey: string | symbol) => {
        // 获取该属性的类型
        const TypeClass = Metadata.getType(target, propertyKey)
        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
            writable: true,
            configurable: true
        }
        // 实例化修饰类
        descriptor.value = params && params.length > 0 ? new TypeClass(...params) : new TypeClass()
        Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor)
    }
}
