export const nameSymbol = Symbol("lorry")
// 类元数据
const type = "type"
@Reflect.metadata("parent", "parent")
class Parent {
    getName() {}
}
@Reflect.metadata(type, "class")
export default class HasOwnMetadataClass extends Parent {
    @Reflect.metadata(type, "static")
    static staticProperty() {}
    @Reflect.metadata("bbb", "method")
    @Reflect.metadata("aaa", "method")
    method() {}
}

// Reflect.defineMetadata(type, "class", HasMetadataClass)
