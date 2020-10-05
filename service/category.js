import request from './network.js'
const baseURL = 'http://123.207.32.32:8000/api/h8/';
export function getCategory() {
  return request({
    url: baseURL+'category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: baseURL+'subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: baseURL+'subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}