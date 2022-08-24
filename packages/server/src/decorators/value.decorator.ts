import { descriptorOf } from "@server/utils"

/**
 * init value
 * @param value
 */
export const Value =
    (value: string | any = "") =>
    (target: any, propertyKey: string) => {
        const descriptor = descriptorOf(target, propertyKey) || {
            writable: true,
            configurable: true
        }
        descriptor.value = value
        Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor)
    }
