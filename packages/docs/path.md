## 全局路径变量

* __dirname: 总是返回被执行的 js 所在文件夹的绝对路径

* __filename: 总是返回被执行的 js 的绝对路径

* process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径

* ./: 跟 process.cwd() 一样，返回 node 命令时所在的文件夹的绝对路径

  

## windows与POSIX下路径的差别

POSIX是一个标准，遵循兼容POSIX标准的系统有Unix,Linux

 在windows和mac下，分别通过nodejs打印__filename我们会发现windows路径的分格符使用的是\,而在mac和linux系统下，是使用/作为分隔符

```js
console.log(__filename);
// windows:      E:\nodejs\path.js
// mac:             .../nodejs/path.js
```



## 常用path模块api

 path模块的api不难，大部分都是对字符串的操作，常用的api如下

### path.delimiter 

提供平台特定的路径定界符：

- `;` 用于 Windows
- `:` 用于 POSIX  

使用场景：

```js
process.env.PATH.split(path.delimiter);// process.env.PATH是我们系统的环境变量，我们通过path.delimiter获取路径
```

### path.sep

提供平台特定的路径片段分隔符：

* Windows 上是 `\`
* POSIX 上是 `/`

使用场景：可以用于分割path时，防止操作系统分隔符的差异导致的问题

```js
const {sep} = require('path')
const path='a/b/c' // 或者 windows下a\b\c
path.split(sep)
// [a,b,c]
```

### path.basename(path[,ext])

* 返回 path 的最后一部分,

* ext参数选填，如果ext等于文件后缀的话，会过滤掉文件后缀，区分大小写 

```js
const { basename } = require('path');
const path = '/frankin/code/learn/node/path.js'
basename(path) 
// path.js
basename(path,'.js') 
// path
basename(path,'s') 
// path.j
basename(path,'.JS') 
// path.js
```

### path.dirname(path) 

* 返回path的目录名
* 尾部的目录分隔符会被忽略

``` js
path.dirname('/目录1/目录2/目录3');
// 返回: '/目录1/目录2'
const path = '/frankin/code/learn/node/path.js'
dirname(path) 
// /frankin/code/learn/node
```

### path.extname(path) 

* 返回 path的扩展名，从最后出现的.开始截取到字符串结束。

* 如果path没有.或者path的baseName除了第一个字符串以为没有.，则返回空字符串

``` js
const { extname } = require('path');
const path = '/frankin/code/learn/node/path.js'
extname(path) 
// .js
extname('path.js')
// .js
extname('path.')
// '.'
extname('.js')
// ''
extname('a.ts.spec')
// .spec
```

### path.parse(path) 

根据path返回一个对象 

* dir (目录)

* root (绝对路径的话为/，否则为空)
* base ( 尾部的目录分隔符会被忽略，忽略后的最后一个目录分隔符后的内容) 
* name (base去掉后缀，也就是去掉ext)
* ext (文件后缀，一般为.xxx，如果没有的话为空字符串)  

```js
path.parse('/目录1/目录2/文件.txt');
// 返回:
// { root: '/',
//   dir: '/目录1/目录2',
//   base: '文件.txt',
//   ext: '.txt',
//   name: '文件' }
```

```text
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    目录1/目录2    / 文件   .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格均可忽略。它们纯粹是用于格式化。）
```

### path.format(pathObject) 

与path.parse()相反，参照parse的返回对象作为参数，返回一个path路径。 

* 如果提供了 pathObject.dir，则忽略 pathObject.root。 

* 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。

```js
/ 如果提供了 `dir`、 `root` 和 `base`，
// 则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'
```

### path.isAbsolute(path) 

返回一个boolean值，为path是否为绝对路径的结果 

### path.join([...paths])

path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。 

长度为零的 path 片段会被忽略。 

如果连接后的路径字符串为长度为零的字符串，则返回 '.'，表示当前工作目录。

``` js
path.join('/目录1', '目录2', '目录3/目录4', '目录5', '..');
// 返回: '/目录1/目录2/目录3/目录4'

path.join('目录1', {}, '目录2');
// 抛出 'TypeError: Path must be a string. Received 
```

### path.resolve([...paths]) 

方法会将路径或路径片段的序列解析为绝对路径

* 给定的路径序列会从右到左进行处理，后面的每个 path会被追加到前面，**直到构造出绝对路径**.

* 如果在处理完所有给定的 path片段之后还未生成绝对路径，则会使用当前工作目录。

* 生成的路径会被规范化，并且尾部的斜杠会被删除（除非路径被解析为根目录）

* 如果没有传入 path片段，则 path.resolve() 会返回当前工作目录的绝对路径

```js
path.resolve('/a/b', './c');
//     '/a/b/c'

path.resolve('/a/b', '/c/d/');
//     '/c/d'

path.resolve('a', 'b/c/', '../d/文件.gif');
//     如果当前工作目录是 /A/B，
//     '/A/B/a/b/d/文件.gif'
```

### path.relative(from,to) 

返回from到to的相对路径，

* 如果 from 和 to 各自解析到相同的路径（分别调用 path.resolve() 之后），则返回零长度的字符串。
* 如果将零长度的字符串传入 from 或 to，则使用当前工作目录代替该零长度的字符串。 

```js
const path = require('path')
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// '../../impl/bbb'
path.relative('/data/orandea/test/aaa', '/data/orandea/test/bbb');
// '../bbb'
path.relative('/data/orandea', '/data/orandea/test/bbb');
// 'test/bbb'
```





