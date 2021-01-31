//app.js
require('./helpers/mixin') // mixin

import Router from './router'
import { $showModal, $info } from './utils/message'
import { LoginModel } from './models/login'

App({
  onLaunch() {
    this.checkAppUpdate()

    this.checkUserSession()

    this.checkUserAuth()
  },

  // 页面不存在
  onPageNotFound() {
    Router.page_404()
  },

  // 检查应用更新，仅发布后有效
  checkAppUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调 true说明有更新
      console.log('APP hasUpdate', res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      const confirm = () => {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
      $showModal({ title: '更新检测', content: '检测到新版本，是否重启小程序？' }, confirm)
    })
    updateManager.onUpdateFailed(() => {
      $info({ title: '新版本下载失败，请关闭小程序后重试' })
    })
  },

  // 检查用户登录态
  async checkUserSession() {
    const loginModel = new LoginModel()
    await loginModel.checkSession()
  },

  // 在具体页面内调用该方法
  // 可保证页面内指定的函数仅在登录完成后才会执行
  // 参考 /pages/example/demo/index/index.js
  async handleLoginReady() {
    await this.checkUserSession()
  },

  // 检查用户授权
  checkUserAuth() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log('getUserInfo', res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) { this.userInfoReadyCallback(res) }
            }
          })
        }
      }
    })
  },

  globalData: {
    // 用户授权信息
    userInfo: null,
  }
})