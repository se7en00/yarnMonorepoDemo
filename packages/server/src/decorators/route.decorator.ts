// import { RequestMethod } from "@server/common"
import type { RouterPathConfig } from "@server/interfaces"
import { RouterModule } from "@server/services"

export type RouterParams = Pick<RouterPathConfig, "method" | "path">

/**
 * @description: Routes HTTP GET requests to the specified path.
 * @return {*}
 * @example
 *
 * ```typescript
 * class Example {
 *     `@Router({ method: 'get', path: '/list'})`
 *    async getList(){
 *    }
 *  }
 * ```
 */

export const Router = (params: RouterParams): any => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const key: RouterPathConfig = {
            target,
            name: propertyKey,
            ...params
        }
        RouterModule.DecoratedRouters.set(key, target[propertyKey])
        return descriptor
    }
}

// const createMappingDecorator =
//     (method: RequestMethod) =>
//     (path?: string | string[]): MethodDecorator => {
//         return RequestMapping({
//             [PATH_METADATA]: path,
//             [METHOD_METADATA]: method
//         })
//     }

export const Get = (path = "/") => Router({ method: "GET", path })

export const Post = (path = "/") => Router({ method: "POST", path })

export const Put = (path = "/") => Router({ method: "PUT", path })

export const Delete = (path = "/") => Router({ method: "DELETE", path })
