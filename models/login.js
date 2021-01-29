import { API_URL } from '../configs/env'
import { getStorageToken, setStorageToken } from '../utils/storage'

/**
 * 登录流程
 * 1、调用 `wx.checkSession` 检查登录态是否过期
 * -- 此登录态逻辑由微信维护
 * -- 详见 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html
 * -- success 检查token是否存在，token用于和服务端交互
 * ---- token存在 验证token是否过期、失效
 * ------ token正常 继续执行其它逻辑
 * ------ token异常 调用 `this.login()` 重新发起登录
 * ---- token不存在 调用 `this.login()` 发起登录
 * -- fail 调用 `this.login()` 发起登录
 */
class LoginModel {
  constructor() {
    this.loginPrefix = '/login'
  }

  // 检查用户登录态
  checkSession() {
    return new Promise((resolve, rejcet) => {
      wx.checkSession({
        success: async () => {
          const token = getStorageToken() || ''
          if (token) {
            await this.checkToken(token)
          } else {
            await this.login()
          }
          resolve(true)
        },
        fail: () => this.login()
      })
    })
  }

  // 检查token是否过期
  async checkToken(token) {
    // your check token code
  }

  // 用户登录获取token
  login(cb, fail, done) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              url: API_URL + this.loginPrefix,
              data: {
                code: res.code
              },
              method: 'POST',
              success: async res => {
                if (res) {
                  const token = res.data.token
                  setStorageToken(token)
                  cb && cb(token)
                  resolve(true)
                }
              },
              fail: () => {
                fail && fail()
                resolve(false)
              },
              complete: () => {
                done && done()
              }
            })
          }
        },
      })
    })
  }
}

module.exports = {
  LoginModel
}