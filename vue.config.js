module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    externals: {
      // vue: 模块名字
      // 'Vue' 全局变量Vue
      // 告诉webpack  import Vue from 'vue'
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios',
      lodash: '_'
    }
  }
}
