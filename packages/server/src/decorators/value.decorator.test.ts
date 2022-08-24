import { Value } from "./value.decorator"

describe("@Value()", () => {
    it("init string on property", () => {
        class Test {
            @Value("test")
            field!: string
        }

        const test = new Test()
        expect(test.field).toBe("test")
    })

    it("init custom type on property", () => {
        class User {
            test() {}
        }

        const user = new User()
        class Test {
            @Value(user)
            user!: User
        }
        const methodSpyon = jest.spyOn(User.prototype, "test")
        const test = new Test()
        test.user.test()
        expect(test.user instanceof User).toBeTruthy()
        expect(test.user).toBe(user)
        expect(methodSpyon).toHaveBeenCalledTimes(1)
    })

    it("init symbol on property", () => {
        const testSymbol = Symbol("test")
        class Test {
            @Value(testSymbol)
            field!: symbol
        }

        const test = new Test()
        expect(test.field).toBe(testSymbol)
    })
})
