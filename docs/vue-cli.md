#### 如何使用vue-cli初始化webpack模块项目  [demo点这里](https://github.com/baoendemao/webpack-summary/tree/master/demos/demo-vue-cli)

```

wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-vue-cli $ npm install vue-cli -g
wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-vue-cli $ vue init webpack test-project


wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-vue-cli $ ls test-project/
README.md       build           config          index.html      package.json    src             static

wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-vue-cli/test-project $ npm install

wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-vue-cli/test-project $ npm run dev

```

#### webpack的配置文件
* webpack.base.conf.js 是基础配置文件，提供给webpack.base.conf.js和webpack.dev.conf.js使用

```

// 路径指向根目录
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

```