import { API_URL } from '../configs/env'
import { getStorageToken } from './storage'

// 封装wx.request
class RequestAdaptee {  
  /**
  * @param {String} url 请求地址
  * @param {Object} param 请求地址参数 ?a=1&&b=2
  * @param {Object} data post、put携带内容
  * @param {Function} resolve Promise返回对象
  * @param {Function} reject  Promise返回对象
  */
  request({ url, param={}, data={}, method='GET', resolve, reject }) {
    const token = getStorageToken() || '',
          parsedParam = RequestAdaptee.parseParam(url, param),
          _url = parsedParam ? API_URL + url + parsedParam : API_URL + url

    wx.request({
      url: _url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  }

  static parseParam(url, param) {
    if (param) {
      if (Object.prototype.toString.call(param) === '[object Object]') {
        if (Object.keys(param).length) {
          const existParam = url.indexOf('=') !== -1
          let suffix = ''
          Object.keys(param).forEach((key, index) => {
            suffix += ((!existParam && index === 0 ? '' : '&') + (key + '=' + param[key]))
          })
          return '?' + suffix
        }
      } else {
        throw new error('param参数必须是对象！')
      }
    }
    return ''
  }
}

// wx.request支持Promise
class Request {
  constructor() {
    this.adaptee = new RequestAdaptee()
  }

  request({ url, param={}, data={}, method='GET' }) {
    return new Promise((resolve, reject) => {
      this.adaptee.request({ url, param, data, method, resolve, reject })
    })
  }
}

module.exports = {
  Request,
}