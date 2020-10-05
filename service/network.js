const baseURL = 'http://123.207.32.32:8000/api/h8/';
export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL+options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}