const baseConfig = require("./jest.config.base")

module.exports = {
    ...baseConfig,
    verbose: true,
    projects: ["<rootDir>/packages/*/jest.config.js"],
    coverageDirectory: "<rootDir>/coverage/",
    collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.{ts,tsx}"],
    testURL: "http://localhost",
    moduleNameMapper: {
        "^@server(.*)$": `<rootDir>/packages/./server/src/$1`,
        "^@client(.*)$": `<rootDir>/packages/./server/src/$1`
    }
}
