module.exports = {
    //单行最大长度,超过自动折行
    printWidth: 120,
    // tab缩进大小,默认为2
    tabWidth: 4,
    // 使用tab缩进，默认false
    useTabs: false,
    // 使用分号, 默认true
    semi: false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    singleQuote: false,
    // 行尾逗号,默认es5,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    trailingComma: "none",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    bracketSpacing: true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    jsxBracketSameLine: false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    arrowParens: "avoid",
    // 行尾格式
    endOfLine: "lf",
    parser: "babel-ts",
    // parser: "typescript", // SyntaxError when format json file: https://github.com/azz/pretty-quick/issues/23
    overrides: [
        {
            files: "*.md",
            options: {
                tabWidth: 4
            }
        },

        {
            files: "*.json",
            options: {
                parser: "json",
                tabWidth: 6
            }
        }
    ]
}
