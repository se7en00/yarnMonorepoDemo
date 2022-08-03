import logger from "./logger"
describe("MetaData", () => {
    it("logger should be called", () => {
        const logSpy = jest.spyOn(console, "log")
        logger("test")
        expect(logSpy).toHaveBeenCalledWith("test")
    })
})
