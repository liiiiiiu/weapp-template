import { Request } from '../utils/http'

class RequestTemplate extends Request {
  /**
   * get请求模版
   * @param {String} prefix url前缀
   * @return {Promise} 返回promise
   */
  async getRequest(prefix, param={}) {
    return await this.request({
      url: prefix,
      param,
      data: {},
      method: 'GET'
    })
  }

  /**
   * post请求模版
   * @param {String} prefix url前缀
   * @param {Object} data 传递参数
   * @return {Promise} 返回promise
   */
  async postRequest(prefix, param={}, data) {
    // 参数顺序保持一致
    if (!data) {
      data = param
      param = {}
    }
    return await this.request({
      url: prefix,
      param,
      data,
      method: 'POST'
    })
  }

  /**
   * put请求模版
   * @param {String} prefix url前缀
   * @param {Object} data 传递参数
   * @return {Promise} 返回promise
   */
  async putRequest(prefix, param={}, data) {
    if (!data) {
      data = param
      param = {}
    }
    return await this.request({
      url: prefix,
      param,
      data,
      method: 'PUT'
    })
  }

  /**
   * delete请求模版
   * @param {String} prefix url前缀
   * @param {Object} data 传递参数
   * @return {Promise} 返回promise
   */
  async deleteRequest(prefix, param={}, data) {
    if (!data) {
      data = param
      param = {}
    }
    return await this.request({
      url: prefix,
      param,
      data,
      method: 'DELETE'
    })
  }
}

module.exports = {
  RequestTemplate
}