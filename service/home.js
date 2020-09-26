import request from './network.js'

const baseURL = 'http://123.207.32.32:8000/api/h8/';
export function getMultiData() {
  return request({
    url: baseURL + 'home/multidata'
  })
}
export function getGoodsData(type, page) {
  return request({
    url: baseURL + 'home/data',
    data: {
      type,
      page
    }
  })
}