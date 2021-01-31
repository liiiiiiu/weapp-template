// pages/auth/index.js
import { APP_NAME } from '../../configs/setting'
import { $info, $showLoading, $hideLoading, $success } from '../../utils/message'

const app = getApp()

Page({
  data: {
    appName: APP_NAME,
  },

  async getUserInfo(e) {
    if (!e.detail.errMsg) e = e.detail
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      $info({ title: '授权失败' })
    } else {
      $showLoading({ title: '授权中' })
      const userInfo = e.detail.userInfo
      wx.getUserInfo({
        withCredentials: true,
        success: async res => {
          app.globalData.userInfo = userInfo
          this.setData({ userInfo })
          $hideLoading()
          $success({ title: '授权成功' })
          setTimeout(() => { wx.navigateBack() }, 1000)
        },
        fail: err => {
          $hideLoading()
          $info({ title: '授权失败，请重试' })
        }
      })
    }
  },
})