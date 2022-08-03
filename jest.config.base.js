const path = require("path")
const { lstatSync, readdirSync } = require("fs")
// get listing of packages in the mono repo
const basePath = path.resolve(__dirname, "packages")
const packages = readdirSync(basePath).filter(name => {
    return lstatSync(path.join(basePath, name)).isDirectory()
})

module.exports = {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        ...packages.reduce(
            (acc, name) => ({
                ...acc,
                [`^@${name}(.*)$`]: `<rootDir>/packages/./${name}/src/$1`
            }),
            {}
        )
    },
    rootDir: "../../"
}
