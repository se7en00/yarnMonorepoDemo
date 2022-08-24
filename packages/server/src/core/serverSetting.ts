import { Metadata } from "@server/common"
import { SERVER_SETTINGS } from "@server/constants"
import { Value } from "@server/decorators"
import type { Imports, ServerSettings } from "@server/interfaces"

// 根目录
const rootDir = process.cwd()
// 环境变量
const env = process.env.NODE_ENV

export class ServerSetting implements ServerSettings {
    /**
     * current root dir
     */
    @Value(rootDir) rootDir: string
    /**
     * port
     */
    @Value(8080)
    port: string | number
    /**
     * env
     */
    @Value(env) env: string

    /**
     * API
     */
    @Value({ "/debug": [] })
    imports: Imports

    static serverSettingMap = new Map<keyof ServerSettings, any>()

    /**
     * get server setting from entry class instance which is used by @sever decorator
     * @param target: class instance which is used by @sever decorator
     */
    getMetadata(target: any) {
        return <ServerSettings>Metadata.getOwn(SERVER_SETTINGS, target)
    }

    updateSetting(settings: ServerSettings) {
        const setting: ServerSettings = {
            rootDir: this.rootDir,
            port: this.port,
            env: this.env,
            // globalError: this.globalError,
            // response: this.response,
            // logFileSetting: this.logFileSetting,
            ...settings
        }

        const _imports = this.imports
        setting["imports"] = { ...setting["imports"], ..._imports }
        const keys = Object.keys(setting) as Array<keyof ServerSettings>
        keys.forEach(key => {
            this.setMap(key, setting[key])
        })
    }

    private setMap(propertyKey: keyof ServerSettings, value?: any): void {
        ServerSetting.serverSettingMap.set(propertyKey, value)
    }

    getHttpPort() {
        const hostname = "0.0.0.0"
        return { hostname, port: +ServerSetting.serverSettingMap.get("port") }
    }
}
