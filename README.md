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

# npm run mock 命令 运行 mock server (mock数据使用)
npm run mock

# npm run mockdev (同时执行npm run mock指令和npm run mock指令)
npm run mockdev

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

``` bash
build文件夹    // webpack相关配置
config文件夹   // vue基本配置文件，如监听端口，打包输出等相关配置
node_modules文件夹    // npm安装的依赖包
src文件夹    // 资源文件夹，以后我们就在这个目录下写代码，下面是它的子文件夹
    api     // 存放axios的封装和url管理的数据池（axios相当于搭配vue的ajax）
    assets    // 静态资源、js、css之类的可以放在里面
    components     // 公用组件编写的地方
    config    // 后台实现菜单栏或者nav等管理
    pages     // 页面编写的地方，页面使用组建拼出来的，也是vue文件
    router     // 路由文件夹，配置页面跳转
    vuex       // Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
    App.vue    // 主界面
    Global.js  // Vue.js 的插件应当有一个公开方法 install ，专用于全局方法，属性设置等
    main.js    // 页面程序入口文件，加载各种公共组件
static      //静态资源，如图片、json数据之类等
test    // 单元测试、代码测试
.babelrc    // ES6语法编译配置，用来将es6代码转换为游览器识别的代码
.editorconfig   // 定义代码格式
如果在创建vue-cli项目的时候，安装了eslint，会有.eslintignore (设置所需监听的文件区域，详情可查看百度)

.eslintrc.js //省略
.gitignore      // git上传需要忽略的文件格式
.postcssrc.js   // 转换css工具
index.html      // 页面入口
package.json    // 项目基本信息，项目开发所需模块、项目
```
小tips：所有你想要压缩的文件都放在assets文件夹下，将不用压缩的静态文件放在static文件夹下！
因为webpack会通过copy-webpack-plugin插件，将static里的文件复制到dist里，具体放置在哪里，看具体配置情况。
我们可以在webpack.prod.conf.js里进行查看。


``` bash
项目打包：

（1）webpack会自动压缩src文件夹下的文件，比如:在很多个.vue文件里@import同一个css文件（包含less，scss等），
webpack只会压缩一次，除非你的样式是带有scoped属性的，系统会以[data-v-一串数字]的形式给私有的属性。
具体情况可以查看压缩后的.css文件。

（2）url-loader 和 file-loader不会压缩图片，只是帮你重新命名图片名，
个人推荐imagemin-webpack-plugin这款插件，当然也有其他的压缩插件，看个人喜好~
```
小tips：imagemin-webpack-plugin插件配置要放在copy-webpack-plugin插件配置之后，下面的路径文档有说明哦！！！
图片压缩插件网址：https://github.com/Klathmon/imagemin-webpack-plugin

``` bash
（3）因为使用了vue-router懒加载功能，导致在文件压缩的时候，会多出对应个数的js文件，命名格式为js/[id].[chunkhash].js，
可以在webpack.prod.conf.js里查看。
```

提示：image的路径要用相对路径，如果用绝对路劲，在项目打包压缩后，image路径会报错




