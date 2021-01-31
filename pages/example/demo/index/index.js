// pages/example/demo/index/index.js

// Mixin 
import { Base } from '../../../../mixins/index'

// VM
import { getTempDemo } from '../../../../view-models/demo'

const app = getApp()

Page({
  mixins: [Base],

  data: {
    a: '',
  },

  onLoad(options) {
    console.log('Mixin Base', Base)

    this.getTempDemoData()

    this.waitLoginComplete(options)
  },

  // 推荐在models内发起接口请求
  // 推荐在view-models内进行数据对接逻辑处理，并返回页面所需数据
  async getTempDemoData() {
    const data = await getTempDemo({})
    this.setData({ a: data.a })
    // ...
  },

  // 等待登陆后再执行
  async waitLoginComplete(options) {
    app.handleLoginReady && await app.handleLoginReady()

    // your code
  },
})