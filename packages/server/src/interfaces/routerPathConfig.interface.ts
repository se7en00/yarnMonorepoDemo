export interface RouterPathConfig {
    // a decorator class
    target: any
    // http method
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "ALL" | "HEAD" | "OPTIONS"
    // router path
    path: string | RegExp | Array<string | RegExp>
    // the name of a class method
    name: string
}

export type a = Lowercase<RouterPathConfig["method"]>
