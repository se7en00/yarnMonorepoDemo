/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "@server/common"

function logger(_target: any, _method?: any, descriptor?: any) {
    return descriptor
}

@logger
class Test {
    @logger
    attribut = ""

    // constructor(private _type?: string) {}

    static methodStatic() {}

    @logger
    method(_type: string): boolean {
        return true
    }
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
            const a = Metadata.getType(Test.prototype, "attribut")
            console.log(a)
            // expect(Metadata.getType(Test3.prototype, "attribut")).toBe(String)
        })
    })
})
