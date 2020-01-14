
/**
 * 搜索模块
 */

import request from '@/utils/request'
// 搜索联想建议接口
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
