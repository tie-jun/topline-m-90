/**
 * 文章接口模块
 */
import request from '@/utils/request'
// 获取文章列表
export const getArticle = params => {
  return request({
    //   请求方法
    method: 'GET',
    // 请求路径
    url: '/app/v1_1/articles',
    // 请求体
    params
  })
}
