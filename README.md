### 安装yarn2的workspace插件
``` 
yarn plugin import workspace-tools
```

yarn workspaces focus

要使用此命令，请先安装workspace-tools插件：yarn plugin import workspace-tools

作用：安装单个工作区及其依赖项。
yarn workspaces foreach [command]

要使用此命令，请先安装workspace-tools插件：yarn plugin import workspace-tools

作用：在所有工作空间上运行command命令(有点类似Yarn 1.x中的yarn workspaces)。示例：
yarn workspaces foreach run start
复制代码
yarn workspaces list

注意：需要在workspace-root下执行。
作用：列出所有可用的工作区。示例：

yarn workspaces list


