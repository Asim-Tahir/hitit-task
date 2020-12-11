module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      proxy: {
        "/api": {
          target: "https://jsonplaceholder.typicode.com",
          pathRewrite: {
            "[\w/]+?api": "",
          },
          changeOrigin: true,
        }
      },
      clientLogLevel: "info",
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ["node_modules", "dist", ".nodeenv"]
      }
    }
  },
  transpileDependencies: ["vuex-module-decorators"]
};
