// 接口发起请求的地址配置
// 不推荐在此写入其它配置项

const { envInvoker } = require('../helpers/env')

/**
 * 小程序版本
 * develop  开发版
 * trial    体验版
 * release  正式版
 */
const mpEnvVersion = wx.getAccountInfoSync().miniProgram.envVersion

/**
 * 设置接口发起请求使用的地址
 * 0  mock  拦截接口请求，使用小程序原生Mock功能
 * 1  dev   开发环境
 * 2  test  测试环境
 * 3  prd   生产环境
 */
const _APP_ENV = mpEnvVersion === 'release'
  ? 3   // <-- 修改该值切换 `正式版` 小程序接口地址
  : (mpEnvVersion === 'trial'
    ? 2 // <-- 修改该值切换 `体验版` 小程序接口地址
    : 1 // <-- 修改该值切换 `开发版` 小程序接口地址
  )

// 获取对应环境的env对象
envInvoker.invoke(_APP_ENV)

const { env: 
  { api_env, api_url, api_version } 
} = require('../helpers/env')

module.exports = {
  API_ENV: api_env,
  API_URL: api_url,
}