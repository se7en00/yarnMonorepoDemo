import Koa from "koa"
const app = new Koa()
app.use(async ctx => {
    ctx.body = "Hello World2"
    console.log(2222)
})

app.listen(3000)
