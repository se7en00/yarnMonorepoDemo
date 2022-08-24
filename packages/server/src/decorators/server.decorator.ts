import { Metadata } from "@server/common"
import { SERVER_SETTINGS } from "@server/constants"
import { ServerSettings } from "@server/interfaces"

export const Server = (settings: ServerSettings): ClassDecorator => {
    return (target: any) => {
        Metadata.set(SERVER_SETTINGS, settings, target)
    }
}
