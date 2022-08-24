import { Controller, Get } from "@server/decorators"
import type { Context } from "koa"

@Controller("/user")
class UsersCtl {
    @Get()
    async find(ctx: Context) {
        // 操作数据库一定要 await

        ctx.body = "用户列表222"
    }
    @Get("/:id/detail")
    async findById(ctx: Context) {
        ctx.body = `用户id：${ctx.params.id}`
    }
}

export default new UsersCtl()
