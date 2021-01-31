/**
 * 封装小程序原生wx.showToast、wx.showModal等API
 * 方法参数说明详见：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
 */

class Message {
  constructor() {
    this.duration = 3000
    this.mask = false
  }

  loading(param={}, success, fail, complete) {
    const vali = Message.validateParam(param)
    if (vali) {
      const { title, mask } = param
      wx.showLoading({
        title: title || '加载中',
        mask: mask || this.mask,
        success: res => {
          success && Message.validateFunc(success) && success(res)
        },
        fail: err => {
          fail && Message.validateFunc(fail) && fail(err)
        },
        complete: res => {
          complete && Message.validateFunc(complete) && complete(res)
        }
      })
    }
  }

  hLoading() {
    wx.hideLoading()
  }

  success(param={}, success, fail, complete) {
    const vali = Message.validateParam(param)
    if (vali) {
      const { title, duration, mask } = param
      wx.showToast({
        title: title || '操作成功',
        icon: 'none',
        image: '/assets/toast/success-white.png' || '',
        duration: duration || this.duration,
        mask: mask || this.mask,
        success: res => {
          success && Message.validateFunc(success) && success(res)
        },
        fail: err => {
          fail && Message.validateFunc(fail) && fail(err)
        },
        complete: res => {
          complete && Message.validateFunc(complete) && complete(res)
        }
      })
    }
  }

  fail(param={}, success, fail, complete) {
    const vali = Message.validateParam(param)
    if (vali) {
      const { title, duration, mask } = param
      wx.showToast({
        title: title || '操作失败',
        icon: 'none',
        image: '/assets/toast/fail-white.png' || '',
        duration: duration || this.duration,
        mask: mask || this.mask,
        success: res => {
          success && Message.validateFunc(success) && success(res)
        },
        fail: err => {
          fail && Message.validateFunc(fail) && fail(err)
        },
        complete: res => {
          complete && Message.validateFunc(complete) && complete(res)
        }
      })
    }
  }

  info(param={}, success, fail, complete) {
    const vali = Message.validateParam(param)
    if (vali) {
      const { title, duration, mask } = param
      wx.showToast({
        title: title || '操作异常',
        icon: 'none',
        duration: duration || this.duration,
        mask: mask || this.mask,
        success: res => {
          success && Message.validateFunc(success) && success(res)
        },
        fail: err => {
          fail && Message.validateFunc(fail) && fail(err)
        },
        complete: res => {
          complete && Message.validateFunc(complete) && complete(res)
        }
      })
    }
  }

  modal(param={}, confirm, cancel) {
    const vali = Message.validateParam(param)
    if (vali) {
      const { title, content, cancel_text, cancel_color, confirm_text, is_delete } = param
      const confirmColor = !is_delete ? '#576b95' : '#fa5151'
      wx.showModal({
        title: title || '提示',
        content: content || '',
        cancelText: cancel_text || '取消',
        cancelColor: cancel_color || '#909399',
        confirmText: confirm_text || '确定',
        confirmColor: confirmColor,
        success: res => {
          if (res.confirm) {
            // 用户点击确定
            confirm && Message.validateFunc(confirm) && confirm(res)
          } else if (res.cancel) {
            // 用户点击取消
            cancel && Message.validateFunc(cancel) && cancel(res)
          }
        }
      })
    }
  }

  actionSheet(itemList=[], success, fail, complete) {
    if (Array.isArray(itemList)) {
      wx.showActionSheet({
        itemList,
        success: res => {
          success && Message.validateFunc(success) && success(res)
        },
        fail: err => {
          fail && Message.validateFunc(fail) && fail(err)
        },
        complete: res => {
          complete && Message.validateFunc(complete) && complete(res)
        }
      })  
    } else {
      throw new Error('itemList参数必须是数组！')
    }
  }

  static validateParam(param) {
    const isObj = Object.prototype.toString.call(param) === '[object Object]'
    if (!isObj) {
      throw new Error('param参数必须是对象！')
    }
    return true
  }

  static validateFunc(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]'
  }
}

class MessageCreator {
  create() {
    return new Message()
  }
}

const messageCreator = new MessageCreator()
const _message = messageCreator.create()

// 小程序单独调用类内部方法，this会指向该方法运行时的环境
// 这里将this指向进行手动绑定
module.exports = {
  $showLoading: _message.loading.bind(_message),
  $hideLoading: _message.hLoading.bind(_message),
  $success: _message.success.bind(_message),
  $fail: _message.fail.bind(_message),
  $info: _message.info.bind(_message),
  $modal: _message.modal.bind(_message),
  $actionSheet: _message.actionSheet.bind(_message),
}