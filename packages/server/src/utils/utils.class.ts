/*
 * @Date: 2021-02-26 13:44:52
 * @LastEditors: jian sun
 * @LastEditTime: 2021-02-26 13:48:13
 */

const classFns = {
    /**
     * 获取类名
     */
    getClassName(target: any) {
        return typeof target === "function" ? target.name : target.constructor.name
    },

    /**
     *  获取类
     * @param target
     */
    getClass(target: any): any {
        return target.prototype ? target : target.constructor
    }
}
export default classFns
