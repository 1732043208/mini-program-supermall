// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    checked: true,
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })
    console.log(this.data.cartList);
    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },

  cutCount() {
    console.log('sdsssds')

  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
    onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })

    this.changeData()
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    console.log(counter, totalPrice)

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})