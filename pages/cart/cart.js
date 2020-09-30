// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })
    console.log(this.data.cartList)
  },

  cutCount(){
    console.log('sdsssds')
 
 },
 onChange(event) {
  this.setData({
    checked: event.detail,
  });
},
})