// pages/my/index/index.js

Page({
  data: {
    selectedHD: 0,
    selectedOther: 0,
    selectedBD: 0,
    windowHeight: wx.getSystemInfoSync().windowHeight
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  handleSelectHD(e) {
    this.setData({ selectedHD: parseInt(e.detail) })
  },

  handleSelectOther(e) {
    this.setData({ selectedOther: parseInt(e.detail) })
  },

  handleSelectBD(e) {
    this.setData({ selectedBD: parseInt(e.detail) })
  },
})