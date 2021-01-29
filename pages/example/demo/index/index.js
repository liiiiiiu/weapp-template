// pages/example/demo/index/index.js

const app = getApp()

Page({
  data: {

  },

  onLoad(options) {
    this.waitLoginComplete(options)
  },

  // 等待登陆后再执行
  async waitLoginComplete(options) {
    app.handleLoginReady && await app.handleLoginReady()

    // your code
  },
})