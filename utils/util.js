// 日期转化为年月日格式
const date2YMD = date => {
  if (!date) return ''
  // console.log(date, typeof date)
  return date.toString().substr(0, 10)
}

// 时间戳转年月日时分秒
const timestamp2Time = timestamp => {
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}

const appendZero = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 字符串转为数字
const str2Num = str => {
  if ((typeof str !== 'number') && !str) return ''
  return parseInt(str)
}

// 分转为元
const cent2Yuan = (cent, isFloat=true) => {
  if (!cent) return ''
  return isFloat ? ((parseInt(cent) / 100).toFixed(2)) : ((parseInt(cent) / 100) >> 0)
}

// 元转为分
const yuan2Cent = yuan => {
  if (!yuan) return 0
  return accMul(yuan + '', 100 + '')
}

// 深拷贝
const cloneDeep = value => {
  return JSON.parse(JSON.stringify(value))
}

// 是否为对象
const isObj = obj => {
  return obj ? Object.prototype.toString.call(obj) === '[object Object]' : false
}

// 是否为数组
const isArray = arr => {
  return arr ? Array.isArray(arr) : false
}

// 是否为函数
const isFunc = fn => {
  return fn ? Object.prototype.toString.call(fn) === '[object Function]' : false
}

// 解析e.currentTarget.dataset
const parseDataset = e => {
  return e.currentTarget.dataset
}

// 输出格式化后console
const inputConsole = ({ name, param, data, res, remark }) => {
  console.log('%c↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓', 'color: #67c23a')
  console.log(`发起请求函数：${name}`)
  if (remark) console.log('=> 函数说明：', remark)
  if (param) console.log('=> 携带参数：', param)
  if (data) console.log('=> 携带内容：', data)
  if (res) console.log('=> 返回结果：', res)
  console.log('=> 打印时间：', timestamp2Time(new Date().getTime()))
  console.log('%c↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑', 'color: #67c23a')
}

/**
 * itemHandler
 * 字段处理器
 * 将接口返回的需要特殊处理的参数通过代理进行处理后返回
 */
const itemHandler = (item, cb) => {
  return new Proxy(item, {
    get(target, key) {
      const value = target[key]
      return cb && cb(key, value)
    }
  })
}

// 计算小数乘法
const accMul = (arg1, arg2) => { 
  let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString()
  try {
    m += s1.split(".")[1].length
  } catch(e) {} 
  try {
    m += s2.split(".")[1].length
  } catch(e) {} 
  return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10, m) 
}

// 生成uuid
const wxuuid = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
 
  const uuid = s.join('')
  return uuid
}


module.exports = {
  str2Num,
  timestamp2Time,
  date2YMD,
  cent2Yuan,
  yuan2Cent,
  cloneDeep,
  isObj,
  isArray,
  isFunc,
  parseDataset,
  inputConsole,
  itemHandler,
  accMul,
  wxuuid,
}
