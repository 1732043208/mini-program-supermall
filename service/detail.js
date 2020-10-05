import request from './network.js'

export function getDetailData(iid) {
  return request({
    url:'detail',
    data:{
      iid
    }
  })
}
export function getrecommend() {
  return request({
    url: 'recommend',
  })
}
