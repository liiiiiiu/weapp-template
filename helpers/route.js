
function validateParam(url, param) {
  if (Object.prototype.toString.call(param) === '[object Object]') return true
  throw new Error(url + ' Router param参数必须是对象！')
}

function validateRouterType(url, type) {
  const whiteList = ['navigateTo', 'switchTab', 'redirectTo', 'none']
  if (whiteList.includes(type)) return true
  throw new Error(url + ' Router type参数必须为navigateTo、switchTab、redirectTo、none之一！')
}

function parseParam(url, param) {
  if (param && Object.keys(param).length) {
    const existParam = url.indexOf('=') !== -1
    let suffix = ''
    Object.keys(param).forEach((key, index) => {
      suffix += (((!existParam && index === 0) ? '' : '&') + (key + '=' + param[key]))
    })
    return '?' + suffix
  }
  return ''
}

function handleRouterType(type, url) {
  if (type === 'navigateTo') {
    return wx.navigateTo({ url })
  } else if (type === 'switchTab') {
    return wx.switchTab({ url })
  } else if (type === 'redirectTo') {
    return wx.redirectTo({ url })
  }
}

function resolveRouter(url, param, type) {
  if (!url) url = '/pages/404/index'
  let checkParam = true,
      checkType = true
  if (param) checkParam = validateParam(url, param)
  if (type) checkType = validateRouterType(url, type)
  if (checkParam && checkType) {
    const urlWithParam = url + parseParam(url, param)
    if (type === 'none') return urlWithParam
    return handleRouterType(type, urlWithParam)
  }
}

module.exports = {
  resolveRouter
}