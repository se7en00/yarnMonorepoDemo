export type Imports = {
    [path: string]: any
}

export interface ServerSettings {
    // root dir
    rootDir?: string
    // listening port
    port?: string | number
    // api
    imports?: Imports

    interceptor?: object

    globalError?: object

    response?: object

    env?: string
    // log file 设置
    // logFileSetting?: any
}
