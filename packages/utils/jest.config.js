const baseConfig = require("../../jest.config.base")

module.exports = {
    ...baseConfig,
    displayName: "utils",
    roots: ["./packages/utils/"],
    modulePathIgnorePatterns: ["<rootDir>/packages/utils/dist/"],
    // setupFiles: ["<rootDir>/packages/utils/jestSetup.ts"],
    // setupFilesAfterEnv: ["<rootDir>/packages/client/jestSetupAfterEnv.js"],
    // testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
