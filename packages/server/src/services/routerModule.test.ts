import { Metadata } from "@server/common"
import { CONTROLLER__PATH_WATERMARK } from "@server/constants"
import { Controller } from "@server/decorators"
import { getClassName } from "@server/utils"
import { RouterModule } from "./routerModule"
import { Get } from "@server/decorators/route.decorator"

describe("RouterModule()", () => {
    @Controller("/test")
    class Test {
        @Get("/list")
        test() {}
    }

    @Controller("/test2")
    class Test2 {
        @Get("/detail")
        test2() {}
    }

    it("should be a string start with slash", () => {
        const pathStr = "test/something"
        const routerModule = new RouterModule()

        const newPathStr = routerModule.ensureSlash(pathStr)
        expect(newPathStr).toBe("/test/something")
    })

    it("should be not change if a string start with slash", () => {
        const pathStr = "/test/something"
        const routerModule = new RouterModule()

        const newPathStr = routerModule.ensureSlash(pathStr)
        expect(newPathStr).toBe("/test/something")
    })

    it("should controller path be with single prefix path ", () => {
        const imports = { "/api": [Test] }
        const routerModule = new RouterModule()
        routerModule.joinControllerPath(imports)
        const path = Metadata.getOwn(`${CONTROLLER__PATH_WATERMARK}_${getClassName(Test)}`, Test)
        expect(path).toBe("/api/test")
    })

    it("should controller path be with multiple prefix path ", () => {
        const imports = { "/api": [Test], "/api2": Test2 }
        const routerModule = new RouterModule()
        routerModule.joinControllerPath(imports)
        const path = Metadata.getOwn(`${CONTROLLER__PATH_WATERMARK}_${getClassName(Test)}`, Test)
        const path2 = Metadata.getOwn(`${CONTROLLER__PATH_WATERMARK}_${getClassName(Test2)}`, Test2)
        expect(path).toBe("/api/test")
        expect(path2).toBe("/api2/test2")
    })

    it("shold be", () => {
        // const imports = { "/api": [Test], "/api2": Test2 }
        // const routerModule = new RouterModule()
        // routerModule.loadRouter(new Koa())
    })
})
