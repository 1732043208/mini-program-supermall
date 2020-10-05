// pages/detail/childCpns/w-bottom-bar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bottom: ''
  },
  ready() {
    this.getSytemInfo()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onAddCart() {
      this.triggerEvent('addcart', {}, {})
    },
    getSystemInfo() {
      let isIphone = App.globalData.isIphone;
      if (isIphone) {
        this.setData({
          bottom: '58rpx'
        })
      }
    }
  },

})