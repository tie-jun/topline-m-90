/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// 处理返回数据超出 JS 安全整数范围问题
import jsonBig from 'json-bigint'
// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// transformResponse 是由axios 提供的一个Api  处理数据安全整数问题
request.defaults.transformResponse = [function (data) {
  // 如果转换成功就执行try，直接返回数据
  try {
    return jsonBig.parse(data)
    // 如果转换成功就执行catch，直接返回一个空对象
  } catch (err) {
    return {}
  }
}]

// 导出
export default request
