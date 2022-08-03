import Koa from "koa"
import { getClassName } from "@server/utils"
import { logger } from "@utils/index"

const app = new Koa()
app.use(async ctx => {
    const className = `${getClassName(app)}222`
    console.log(className)
    ctx.body = "Hello World8"
    console.log(logger("logger server"))
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})
