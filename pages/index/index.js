// index.js
import Router from '../../router'
import { APP_NAME, APP_SLOGON } from '../../configs/setting'
import { $info } from '../../utils/message'
import { parseDataset } from '../../utils/util'

Page({
  data: {
    appName: APP_NAME,
    appSlogon: APP_SLOGON
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  onPage404() {
    Router.page_404()
  },

  onPage500() {
    Router.page_500()
  },

  onPageAuth() {
    Router.page_auth()
  },

  onExampleApi() {
    wx.navigateTo({ url: '/pages/example/api/index' })
  },

  onExampleRouter() {
    wx.navigateTo({ url: '/pages/example/router/index' })
  },

  displayBaseCSS() {
    $info({ title: '请查看base.wxss' })
  },

  displayBaseIcon() {
    $info({ title: '请查看assets/base' })
  },

  displayUtilJS() {
    $info({ title: '请查看util.js' })
  },

  displayMixin() {
    $info({ title: '请查看README.md' })
  },

  displayLogin() {
    $info({ title: '请查看README.md' })
  },

  displayVM() {
    $info({ title: '请查看README.md' })
  },

  displayDeveloping() {
    $info({ title: '开发中' })
  },

  copy(e) {
    const text = parseDataset(e)['text']
    wx.setClipboardData({
      data: text,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res)
          }
        })
      }
    })
  },
})
