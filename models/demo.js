import { RequestTemplate } from './template'

class DemoRequestModel extends RequestTemplate {
  constructor() {
    super()
    this.demoPrefix = '/demo'
  }

  // get请求用法
  async getDemo(param) {
    return await this.getRequest(this.demoPrefix, param).catch(err => {
      console.error('DemoRequestModel getDemo request err', err)
      return null
    })
  }

  // post请求用法
  async postDemo(data) {
    return await this.postRequest(this.demoPrefix, data).catch(err => {
      console.error('DemoRequestModel postDemo request err', err)
      return false
    })
  }

  // put请求用法
  async putDemo(data) {
    return await this.putRequest(this.demoPrefix, data).catch(err => {
      console.error('DemoRequestModel putDemo request err', err)
      return false
    })
  }

  // delete请求用法
  async deleteDemo(param, data) {
    return await this.deleteRequest(this.demoPrefix, param, data).catch(err => {
      console.error('DemoRequestModel deleteDemo request err', err)
      return false
    })
  }
}

module.exports = {
  DemoRequestModel,
}