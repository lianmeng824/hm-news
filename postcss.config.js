module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 36, // 设置1rem的大小  一般是37.5
      propList: ['*'] // 把哪些内容转成rem
    }
  }
}
