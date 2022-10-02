const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
      },
    },
  },
});
