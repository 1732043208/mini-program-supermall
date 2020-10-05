import request from './network.js'

const baseURL = 'http://123.207.32.32:8000/api/h8/';
export function getDetailData(iid) {
  return request({
    url: baseURL + 'detail',
    data:{
      iid
    }
  })
}
export function getrecommend() {
  return request({
    url: baseURL + 'recommend',
  })
}
