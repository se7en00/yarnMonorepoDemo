import Koa from "koa"
import { Autowired } from "@server/decorators"
import { RouterModule } from "@server/services"
import { ServerSetting } from "./serverSetting"
import type { Imports, ServerSettings } from "@server/interfaces"
import bodyParser from "koa-bodyparser"

export interface ApplicationType {
    start(): Promise<any>
    use(middleware: Koa.Middleware): this
}

export abstract class Application implements ApplicationType {
    @Autowired()
    private app: Koa

    @Autowired()
    private serverSetting: ServerSetting

    @Autowired()
    private routerModule: RouterModule

    constructor() {
        //get server setting
        const serverSettingParams = this.serverSetting.getMetadata(this)
        if (serverSettingParams) {
            this.setServerSettings(serverSettingParams)
        }
    }

    /**
     * @description: add server setting to the provider server map
     * @param {ServerSettings} settings
     * @return {void}
     */
    private setServerSettings(settings: ServerSettings) {
        this.serverSetting.updateSetting(settings)
    }

    /**
     * bodyParser
     */
    private async loadBodyParser(): Promise<void> {
        return new Promise(res => {
            this.app.use(bodyParser())
            res()
        })
    }

    /**
     *
     * @param middleware koa middleware
     */
    public use(middleware: Koa.Middleware): this {
        this.app.use(middleware)
        return this
    }

    /**
     * start server
     */
    private async startServer(): Promise<void> {
        const { hostname, port } = this.serverSetting.getHttpPort()
        return new Promise<void>(res => {
            this.app.listen(port, hostname)
            // eslint-disable-next-line no-console
            console.log(`app start ${port}`)
            // this.logger.info(`app start ${3000}`)
            res()
        })
    }

    /**
     * set controller routers
     */
    private async loadRouters(): Promise<any> {
        const imports = <Imports>ServerSetting.serverSettingMap.get("imports")
        return new Promise<void>(res => {
            // 设置controller 路径
            this.routerModule.joinControllerPath(imports)
            // 载入路由
            this.routerModule.loadRouter(this.app)
            res()
        })
    }

    public async start(): Promise<any> {
        try {
            await this.loadBodyParser()
            await this.loadRouters()
            await this.startServer()
        } catch (error) {
            Promise.reject(error)
            throw error
        }
    }
}
