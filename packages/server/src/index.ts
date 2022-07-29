import Koa from "koa"
import { getClassName } from "@/utils"

const app = new Koa()
app.use(async ctx => {
    const className = `${getClassName(app)}222`
    console.log(className)
    ctx.body = "Hello World8"
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})
