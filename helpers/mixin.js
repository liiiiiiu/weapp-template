/**
 * mixin.js
 * 实现代码混入
 */

const originProperties = ['data', 'properties', 'options']
const originMethods = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onShareTimeline',
  'onPageScroll',
  'onResize',
  'onTabItemTap'
]

function mergeMixin(mixins, options) {
  // console.log('mergeMixin', mixins, options)
  mixins.forEach(mixin => {
    if (Object.prototype.toString.call(mixin) !== '[object Object]') {
      throw new Error('mixin必须为对象类型！')
    }
    for (const [key, value] of Object.entries(mixin)) {
      if (originProperties.includes(key)) {
        // 混入属性
        options[key] = { ...value, ...options[key] }
      } else if (originMethods.includes(key)) {
        // 混入方法
        const originFunc = options[key]
        options[key] = function(...args) {
          value.call(this, ...args)
          originFunc && originFunc.call(this, ...args)
        }
      } else {
        // 其它自定义方法
        options = { ...mixin, ...options }
      }
    }
  })
  return options
}

const originPage = Page
Page = options => {
  const mixins = options.mixins
  if (Array.isArray(mixins)) {
    delete options.mixins
    options = mergeMixin(mixins, options)
  }
  originPage(options)
}