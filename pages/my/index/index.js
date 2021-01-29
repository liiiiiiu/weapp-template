// pages/my/index/index.js
import Router from '../../../router'
import { Base } from '../../../mixins/index'
import { APP_NAME, SLOGON } from '../../../configs/setting'
import { $showLoading, $hideLoading, $success } from '../../../utils/message'
import { getStorageUserId } from '../../../utils/storage'

const app = getApp()

Page({
  mixins: [Base],

  data: {
    name: 'MyIndex',
    // 用于使用页面自定义的下拉刷新事件
    useCustomPullDownRefresh: true,
    // 用户
    user: {},
    // 云养数
    adoptCount: 0,
    // 消息数
    notifyCount: 0,
  },

  onLoad(option) {
    this.waitLoginComplete(option)
  },

  onShow() {
    // Mixin混入 Base.js
    // 检查用户是否授权
    this.checkUserInfo()

    // if (app.globalData.refreshMyData) {
    //   this.getUserData()
    //   app.globalData.refreshMyData = false
    // }

    // this.getMyData()

    // this.getNotifyData()

    wx.hideTabBarRedDot({ index: 4 })
  },

  async onPullDownRefresh() {
    await this.getMyData()
    await this.getNotifyData()
    wx.stopPullDownRefresh()
  },

  // 分享好友
  onShareAppMessage() {
    const distributerId = getStorageUserId() || 0
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: APP_NAME + '-' + '个人中心',
      path: Router.my_index({ distributer_id: distributerId }, 'none')
    }
  },

  // 分享朋友圈
  onShareTimeline() {
    return { title: APP_NAME + '-' + SLOGON }
  },

  // 等待登陆后再执行
  async waitLoginComplete(option) {
    app.handleLoginReady && await app.handleLoginReady()

    // 分享返佣
    const distributerId = option.distributer_id || 0
    if (distributerId) app.updateDistributer && app.updateDistributer(distributerId)
    const distributedId = option.distributed_id || 0
    if (distributerId) await userShare({ distributed_id: distributedId, distributer_id: distributerId })
  },

  async getMyData() {
    $showLoading()
    await this.getUserData()
    await this.getPetData()
    $hideLoading()
  },

  async getUserData() {
    const data = await getUserById({ user_id: 0, from: 'myIndex' })
    if (data) this.setData({ user: data })
  },

  async getPetData() {
    const data = await getPet({ scope: 'adopt', page: 1, count: 1, from: 'myIndex' })
    if (data) this.setData({ adoptCount: data })
  },

  // 获取所有消息数量
  async getNotifyData() {
    const data = await getNotifyCount()
    let hasNewNotify = false
    if (data) {
      const adoptCount = parseInt(data['adopt_count']),
            commentCount = parseInt(data['comment_count']),
            likesCount = parseInt(data['likes_count']),
            systemCount = parseInt(data['system_count'])
      if (adoptCount || commentCount || likesCount || systemCount) hasNewNotify = true
    }
    this.setData({ notifyCount: hasNewNotify })
  },

  // 用户签到
  async handleUserSign() {
    $showLoading('签到中')
    const data = await userSign()
    if (data) {
      await this.getUserData()
      $hideLoading()
      $success({ title: '签到成功' })
    } else {
      $hideLoading()
    }
  },

  // 跳转我的宠物
  onPetList() {
    Router.pet_list()
  },

  // 跳转我的宠物-云养列表
  onAdoptPetList() {
    Router.pet_list({ type: 1 })
  },

  // 跳转我的余额
  onWalletIndex() {
    Router.wallet_index()
  },

  // 跳转我的消息
  onNotifyList() {
    Router.notify_list()
  },

  // 跳转分销
  onDistributionIndex() {
    Router.distribution_index()
  },
})