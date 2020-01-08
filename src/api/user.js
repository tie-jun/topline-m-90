import request from '@/utils/request'

export const login = data => {
  return request({
    //   请求方法
    method: 'POST',
    // 请求路径
    url: '/app/v1_0/authorizations',
    // 请求体
    data
  })
}
