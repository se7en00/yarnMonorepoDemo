const baseConfig = require("../../jest.config.base")

module.exports = {
    ...baseConfig,
    displayName: "server",
    roots: ["./packages/server/"],
    modulePathIgnorePatterns: ["<rootDir>/packages/server/dist/"],
    setupFiles: ["<rootDir>/packages/server/jestSetup.ts"],
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
