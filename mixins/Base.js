// 基础混入
import { DEFAULT_COUNT } from '../configs/setting'

const app = getApp()

module.exports = {
  data: {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // Page
    // 列表发起请求获取数据的通用变量
    // 请求锁
    requestLock: false,
    // 加载进度
    loadComplete: false,
    // 是否为下拉刷新
    isPullDownRefresh: false,
    // 是否为加载更多
    isLoadMore: false,
    // 是否为空数据
    isEmptyData: false,
    // 是否无更多数据
    isNoMoreData: false,
    // 分页
    page: 1,
    count: DEFAULT_COUNT,
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    // 用户信息
    userInfo: app.globalData.userInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // Page
  // 用户授权的通用函数

  // 检查用户是否授权
  checkUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({ userInfo: res.userInfo })
      }
    }
  },

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // Page
  // 列表发起请求获取数据的通用函数

  // 下拉刷新数据
  async onPullDownRefresh() {
    if (this.data.useCustomPullDownRefresh) return

    wx.showNavigationBarLoading()

    this.data.page = 1
    this.data.isPullDownRefresh = true
    this.setData({ isNoMoreData: false })

    if (this.requestByPullDownRefresh) await this.requestByPullDownRefresh()

    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  
  // 上滑加载更多数据
  async onReachBottom() {
    const { isEmptyData, isNoMoreData, requestLock } = this.data
    if (isEmptyData || isNoMoreData || requestLock) return

    this.data.requestLock = true
    this.setData({ isLoadMore: true })
    if (!this.data.isNoMoreData) this.data.page++

    let datas
    if (this.requestByReachBottom) datas = await this.requestByReachBottom()
    // 返回null则不作处理
    if (datas) {
      datas.length
      ? (this.reqSuccessHandlerByReachBottom && this.reqSuccessHandlerByReachBottom(datas))
      : this.setData({ isNoMoreData: true })
    }

    this.setData({ isLoadMore: false })
    this.data.requestLock = false
  },

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

}