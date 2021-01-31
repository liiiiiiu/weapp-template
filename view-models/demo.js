import { getTemp, postTemp, deleteTemp } from './template'
import { itemHandler, str2Num, inputConsole } from '../utils/util'
import { DemoRequestModel } from '../models/demo'

const demoRequestModel = new DemoRequestModel()

// 用法请查看 /pages/example/demo/index/index.js

// getTemp用法
export async function getTempDemo(param={}) {
  const res = await getTemp(demoRequestModel.getDemo(param))
  if (res && res.length) {
    const tempArr = []
    Array.from(datas, item => {
      if (item.id) {
        item = itemHandler(item, (key, value) => {
          if (key === 'id')
            return str2Num(value)
          return value
        })
        tempArr.push({
          id: item.id,
          // ...
        })
      }
    })
    inputConsole({
      name: 'getTempDemo',
      remark: 'getTemp用法',
      param,
      res: tempArr
    })
    return tempArr
  }
  return null
}

// postTemp用法
export async function postTempDemo(data) {
  if (!data) return
  const res = await postTemp(demoRequestModel.postDemo(data))
  inputConsole({
    name: 'postTempDemo',
    remark: 'postTemp用法',
    data,
    res
  })
  return res ? true : false
}

// deleteTemp用法
export async function deleteTempDemo(param={}, data={}) {
  const res = await deleteTemp(demoRequestModel.deleteDemo(param, data))
  inputConsole({
    name: 'deleteTempDemo',
    remark: 'deleteTemp用法',
    param,
    data,
    res
  })
  return res ? true : false
}