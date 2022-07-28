import Koa from "koa"
const app = new Koa()
app.use(async ctx => {
    ctx.body = "Hello World8"
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})
