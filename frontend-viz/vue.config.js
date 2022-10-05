const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin  = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: 'http://localhost:5000'
  },
  configureWebpack: {
    resolve:{
      fallback:{
        fs:false,
        path:false,
        crypto: false 
      }
    },
  }
});
