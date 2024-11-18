// frontend/vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'https://jozady-trip-scheduler-mfe4lvg50-jioshuns-projects.vercel.app', // バックエンドサーバーのURL
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Jozady（ジョザディ）'
    }
  }
});
