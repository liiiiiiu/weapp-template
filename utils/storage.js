import { $info } from './message'

// Token
const TokenKey = 'Token'

export function getStorageToken() {
  return wx.getStorageSync(TokenKey)
}

export function setStorageToken(token) {
  try {
    wx.setStorageSync(TokenKey, token)
  } catch (e) {
    $info({ title: e })
  }
}

export function removeStorageToken() {
  return wx.removeStorageSync(TokenKey)
}