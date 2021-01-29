/**
 * router.js
 * 保存页面的跳转路径
 * 用于wx.navigateTo()等路由API
 */

 import { resolveRouter } from './helpers/route'

/**
 * @param {Object} param url 页面路径
 * @param {String} type 路由类型 none：不进行跳转，navigateTo、switchTab、redirectTo对应API
 * @return {String|Function} type传入none只返回路径，传入其它返回navigateTo、switchTab、redirectTo对应API的方法
 */
const Router = {
  // app首页
  app_index: (param={}, type='switchTab') => {
    return resolveRouter('/pages/index/index', param, type)
  },
  // 404
  page_404: (param={}, type='navigateTo') => {
    return resolveRouter('/pages/404/index', param, type)
  },
  // 500
  page_500: (param={}, type='navigateTo') => {
    return resolveRouter('/pages/500/index', param, type)
  },
  // 授权
  page_auth: (param={}, type='navigateTo') => {
    return resolveRouter('/pages/auth/index', param, type)
  },
}

module.exports = Router