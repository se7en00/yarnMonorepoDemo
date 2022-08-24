import { Metadata } from "./Metadata"

const classDecorator: ClassDecorator = () => {}
const methDecorator: MethodDecorator = (
    _target: object,
    _method?: string | symbol,
    _descriptor?: PropertyDescriptor
) => {}
const propertyDecorator: PropertyDecorator = (_target: object, _propertyKey: string | symbol) => {}

@classDecorator
class Test {
    @propertyDecorator
    attribut: string = ""

    constructor(private type?: string) {}

    static methodStatic() {}

    @methDecorator
    method(_type: string): boolean {
        this.type
        return true
    }
}

class Test2 {
    attribut: any

    constructor() {}

    static methodStatic() {}

    method() {}
}

describe("MetaData", () => {
    describe("has", () => {
        it("should return false (String)", () => {
            expect(Metadata.has("testunknow", String)).toBe(false)
        })

        it("should return false (bad target)", () => {
            expect(Metadata.has("testunknow", undefined)).toBe(false)
        })
    })
    describe("set", () => {
        it("should set meta on a class", () => {
            expect(Metadata.set("metadatakey1", "test1", Test)).toBeUndefined()
            expect(Metadata.has("metadatakey1", Test)).toBe(true)
        })

        it("should set meta on instance", () => {
            expect(Metadata.set("metadatakey2", "test2", new Test())).toBeUndefined()
            expect(Metadata.has("metadatakey2", Test)).toBe(true)
        })

        it("should set meta on a method", () => {
            expect(Metadata.set("metadatakey3", "test1", Test, "method")).toBeUndefined()
            expect(Metadata.has("metadatakey3", Test, "method")).toBe(true)
        })
    })
    describe("get", () => {
        it("should getmeta on a class", () => {
            Metadata.set("metadatakey1", "test1", Test)
            expect(Metadata.get("metadatakey1", Test)).toEqual("test1")
        })
        it("should getmeta on instance", () => {
            const testInstance = new Test()
            Metadata.set("metadatakey1", "test1", testInstance)
            expect(Metadata.get("metadatakey1", testInstance)).toEqual("test1")
        })
        it("should get meta on a method", () => {
            Metadata.set("metadatakey1", "test1", Test, "method")
            expect(Metadata.get("metadatakey1", Test, "method")).toEqual("test1")
        })
    })

    describe("getOwn", () => {
        it("should get meta on a class", () => {
            Metadata.set("metadatakey1", "test1", Test)
            expect(Metadata.getOwn("metadatakey1", Test)).toEqual("test1")
        })

        it("should get meta on a method", () => {
            Metadata.set("metadatakey1", "test1", Test, "method")
            expect(Metadata.getOwn("metadatakey1", Test, "method")).toEqual("test1")
        })
    })

    describe("delete", () => {
        it("should remove meta on a class", () => {
            Metadata.set("metadatakey1", "test1", Test)
            expect(Metadata.delete("metadatakey1", Test)).toBe(true)
        })
    })

    describe("getType", () => {
        it("should return attribut type", () => {
            const attributType = Metadata.getType(Test.prototype, "attribut")
            expect(attributType).toEqual(String)
        })
    })

    describe("getParamTypes", () => {
        it("should return types on constructor", () => {
            const constructorType = Metadata.getParamTypes(Test)
            expect(Array.isArray(constructorType)).toBe(true)
            expect(constructorType[0]).toEqual(String)
        })

        it("should return types on method", () => {
            const methodType = Metadata.getParamTypes(Test.prototype, "method")
            expect(Array.isArray(methodType)).toBe(true)
            expect(typeof methodType[0]).toEqual(expect.any(String))
        })
    })

    describe("getOwnParamTypes", () => {
        it("should return types on constructor", () => {
            const constructorOwnType = Metadata.getOwnParamTypes(Test)
            expect(Array.isArray(constructorOwnType)).toBe(true)
            expect(typeof constructorOwnType[0]).toEqual(expect.any(String))
        })

        it("should return types on method", () => {
            const methodType = Metadata.getOwnParamTypes(Test.prototype, "method")
            expect(Array.isArray(methodType)).toBe(true)
            expect(typeof methodType[0]).toEqual(expect.any(String))
        })
    })

    describe("getReturnType", () => {
        it("should return types on method", () => {
            const methodReturnType = Metadata.getReturnType(Test.prototype, "method")
            expect(methodReturnType).toBeTruthy()
        })
    })

    describe("getOwnReturnType", () => {
        it("should return types on method", () => {
            expect(Metadata.getReturnType(Test.prototype, "method")).toBeTruthy()
        })
    })

    describe("list", () => {
        it("should return unique provide from property key", () => {
            Metadata.set("controller", "test", Test)
            Metadata.set("controller", "test2", Test2)
            Metadata.set("controller", "test", Test)

            const result = Metadata.getTargetsFromPropertyKey("controller")
            expect(Array.isArray(result)).toBe(true)

            expect(result.indexOf(Test) > -1).toBe(true)
            expect(result.indexOf(Test2) > -1).toBe(true)

            const result2 = Metadata.getTargetsFromPropertyKey("controller2")
            expect(Array.isArray(result2)).toBe(true)
            expect(result2.length).toEqual(0)
        })
    })
})
