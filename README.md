一个可以在nuxt编译阶段通过解析代码中的注释，分割服务端或者客户端代码的工具  
A tool that can split the server or client code by parsing the comments in the code during the nuxt compilation stage  

安装
```
npm i nuxt-server-client-diff-loader
```

使用

in the code
```
// client js begin
window...
// client js end

// server js begin
global...
// server js end

```
nuxt.config.js
```
build:{
  extend(config, ctx) {
      config.module.rules.push({
        test: /\.ts$|\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'nuxt-server-client-diff-loader',
          options: {
            isServer: ctx.isServer,
          },
        },
      });
    },
}
```