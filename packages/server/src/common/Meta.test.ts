import HasOwnMetadataClass from "@server/common/Meta"

describe("test", () => {
    it("ss", () => {
        const t1 = Reflect.getMetadataKeys(HasOwnMetadataClass)
        // const t2 = Reflect.getMetadataKeys(HasOwnMetadataClass.prototype, "method")
        console.log(t1)
    })
})
