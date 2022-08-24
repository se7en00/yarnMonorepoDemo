import { Application, ApplicationType } from "@server/core"
import userCtl from "./controllers/userCtl"
import { Server } from "./decorators"

@Server({
    port: 3000,
    imports: { api: [userCtl] },
    interceptor: userCtl
})
class App extends Application implements ApplicationType {}

new App()
    .start()
    .then()
    .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
    })
