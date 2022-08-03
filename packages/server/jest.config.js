const baseConfig = require("../../jest.config.base")

module.exports = {
    ...baseConfig,
    displayName: "server",
    roots: ["./packages/server/"],
    modulePathIgnorePatterns: ["<rootDir>/packages/server/dist/"],
    setupFilesAfterEnv: ["<rootDir>/packages/server/jest.setup.ts"],
    testEnvironment: "node",
    transform: {
        "^.+\\.[t|j]sx?$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/"]
}
