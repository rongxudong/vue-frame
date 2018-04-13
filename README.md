# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies （夹包下载）
npm install

# serve with hot reload at localhost:8080 （运行项目命令）
npm run dev

# build for production with minification （打包压缩项目命令）
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests （测试项目）
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

build文件夹 （webpack相关配置）

config文件夹 （vue基本配置文件，如监听端口，打包输出等相关配置）

node_modules文件夹 （npm安装的依赖包）

src文件夹 （资源文件夹，以后我们就在这个目录下写代码，下面是它的子文件夹）
    assets (静态资源，js、css之类的可以放在里面) 
    components （公用组件编写的地方）
    pages （页面编写的地方，页面使用组建拼出来的，也是vue文件）
