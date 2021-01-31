// pages/example/router/index.js
import Router from '../../../router'

Page({
  data: {
    path: ''
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },


  onPage404() {
    Router.page_404()
  },

  onIndex() {
    Router.app_index()
  },

  onPageAuth() {
    Router.page_auth({ id: 1, other: 'a' })
  },

  onPage404None() {
    const path = Router.page_404({}, 'none')
    this.setData({ path })
  },
})