/**
 * viewModel层封装get请求
 * @param {Function} cb 回调函数
 * @return {Promise} 返回promise
 */
export async function getTemp(cb) {
  if (!cb) return null
  return await cb.catch(err => {
    console.error('getTemp', err)
    return null
  })
}

/**
 * viewModel层封装post请求
 * @param {Function} cb 回调函数
 * @return {Boolean|Any} 提交失败返回false，成功返回后端提供的数据
 */
export async function postTemp(cb) {
  if (!cb) return false
  let _err = null
  const res = await cb.catch(err => {
    console.error('postTemp', err)
    _err = err
  })
  return _err ? false : res
}

/**
 * viewModel层封装delete请求
 * @param {Function} cb 回调函数
 * @return {Boolean|Any} 删除失败返回false，成功返回后端提供的数据
 */
export async function deleteTemp(cb) {
  if (!cb) return false
  let _err = null
  const res = await cb.catch(err => {
    console.error('deleteTemp', err)
    _err = err
  })
  return _err ? false : res
}