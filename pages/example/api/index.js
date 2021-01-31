// pages/example/api/index.js
import { $showLoading, $hideLoading, $success, $fail, $info, $modal, $actionSheet } from '../../../utils/message'

Page({
  data: {

  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  displayShowLoading() {
    $showLoading({ title: '登录中' })
  },

  displayHideLoading() {
    $hideLoading()
  },

  displaySuccess() {
    $success({ title: '提交成功', duration: 5000, mask: true }, () => { console.log('success!') })
  },

  displayFail() {
    $fail({ title: '提交失败' })
  },

  displayInfo() {
    $info({ title: '提交提示' }, '', '', () => { console.log('complete!') })
  },

  displayModal() {
    $modal({ title: '确认提交？' }, () => { $success({ title: '提交成功' }) }, () => { $info({ title: '取消提交' }) })
  },

  displayActionSheet() {
    $actionSheet(['a', 'b', 'c'])
  },
})