/*
 * @Date: 2021-02-02 16:07:18
 * @LastEditors: seven.sun seven0_0@126.com
 * @LastEditTime: 2022-08-13 22:36:24
 */
import { Metadata } from "@server/common"
import { CONTROLLER__PATH_WATERMARK } from "@server/constants"
import { getClassName } from "@server/utils"

export const Controller = (path = "/"): ClassDecorator => {
    return (target): void => {
        Metadata.set(`${CONTROLLER__PATH_WATERMARK}_${getClassName(target)}`, path, target)
    }
}
