import request from '@/utils/request'
// 用户注册登录
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

// 获取短信验证码
export const getSmsCode = mobile => {
  return request({
    //   请求方法
    method: 'GET',
    // 请求路径
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
