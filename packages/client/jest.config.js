const baseConfig = require("../../jest.config.base")

module.exports = {
    ...baseConfig,
    displayName: "client",
    roots: ["./packages/client/"],
    modulePathIgnorePatterns: ["<rootDir>/packages/client/dist/"],
    setupFiles: ["<rootDir>/packages/client/jestSetup.ts"],
    // setupFilesAfterEnv: ["<rootDir>/packages/client/jestSetupAfterEnv.js"],
    // testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
