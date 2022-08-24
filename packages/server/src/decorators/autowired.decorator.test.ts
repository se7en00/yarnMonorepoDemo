import { Autowired } from "./autowired.decorator"

describe("@Autowired()", () => {
    it("should be reflect a provider on property", () => {
        class Services {}

        class Test {
            @Autowired()
            services!: Services
        }

        const test = new Test()
        expect(test.services instanceof Services).toBe(true)
    })

    it("should be reflect a provider on property by fn call", () => {
        // GIVEN
        class Services {
            testServices() {}
        }

        class Test {
            @Autowired()
            services!: Services
        }
        // WHEN

        const methodSpyon = jest.spyOn(Services.prototype, "testServices")
        //THEN
        const test = new Test()
        test.services.testServices()
        expect(test.services instanceof Services).toBe(true)
        expect(methodSpyon).toHaveBeenCalledTimes(1)
    })

    it("should be reflect a provider with parameters on property", () => {
        // GIVEN
        class Services {
            constructor(public port: number) {}
        }
        class Test {
            @Autowired(3000)
            services!: Services
        }
        // WHEN
        const test = new Test()

        // THEN
        expect(test.services instanceof Services).toBe(true)
        expect(test.services.port).toBe(3000)
    })
})
