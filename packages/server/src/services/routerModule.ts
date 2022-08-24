import { Autowired } from "@server/decorators"
import type { Imports, RouterPathConfig } from "@server/interfaces"
import Router from "koa-router"
import type Koa from "koa"
import path from "path"
import { CONTROLLER__PATH_WATERMARK } from "@server/constants"
import { getClassName, koaMiddlewareAdapter } from "@server/utils"
import { Metadata } from "@server/common"
import { middlewareAdaptee } from "@server/interfaces"

import { ParamsService } from "./params.service"

export type ApiMiddleware = (...args: any[]) => Promise<any>

export class RouterModule {
    @Autowired()
    private paramsService: ParamsService

    @Autowired()
    private router: Router

    /**
     * router config info map
     */
    static DecoratedRouters: Map<RouterPathConfig, ApiMiddleware | Array<ApiMiddleware>> = new Map()

    static DescriptionMap: Map<string, string> = new Map()

    /**
     * update controller path with prefix path configured in server setting
     * @description:
     * @param {Imports} imports
     */
    joinControllerPath(imports: Imports) {
        for (const [prefixPath, value] of Object.entries(imports)) {
            const ctrs = Array.isArray(value) ? value : [value]
            while (ctrs.length) {
                const ctr = ctrs.shift()
                const metadataName = `${CONTROLLER__PATH_WATERMARK}_${getClassName(ctr)}`
                const oldPath = Metadata.getOwn(metadataName, ctr)
                const newCtrPath = path.join(this.ensureSlash(prefixPath), oldPath).split(path.sep).join("/")
                Metadata.set(metadataName, newCtrPath, ctr)
            }
        }
    }

    loadRouter(app: Koa) {
        for (const [config, methods] of RouterModule.DecoratedRouters) {
            const ctrs = Array.isArray(methods) ? methods : [methods]
            const result = ctrs.map(method => {
                const middlewareAdaptee: middlewareAdaptee = {
                    target: config.target,
                    key: `${getClassName(config.target)}_${method.name}`,
                    middleware: method,
                    callback: this.paramsService.paramsToList
                }
                return koaMiddlewareAdapter(middlewareAdaptee)
            })

            const routerPath = path
                .join(
                    Metadata.getOwn(`${CONTROLLER__PATH_WATERMARK}_${getClassName(config.target)}`, config.target),
                    <string>config.path
                )
                .replace(/\/$/, "")
            // .split(path.sep)
            // .filter(Boolean)
            // .join("/")

            //   let multerKey = `${getClassName(config.target)}_${config.name}_Multer`;
            //   if (config.target[multerKey]) {
            //     controllers.unshift(config.target[multerKey]);
            //   }
            const test = <Lowercase<RouterPathConfig["method"]>>config.method.toLowerCase()
            this.router[test](routerPath, ...(<Router.IMiddleware[]>result))

            const allrouters = this.router.routes()
            app.use(allrouters)
            app.use(this.router.allowedMethods())

            RouterModule.DecoratedRouters.clear()
        }
    }

    ensureSlash(pathStr: string) {
        return `/${pathStr.split("/").filter(Boolean).join("/")}`
    }
}
