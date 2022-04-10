const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  //dev下格式不受限

  publicPath: process.env.NODE_ENV === 'production'
    ? '/blanche/' // repo 名稱
    : '/'
});
