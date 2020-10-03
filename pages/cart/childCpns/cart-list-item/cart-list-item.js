// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品
      const item = app.globalData.cartList.find(item => item.iid == this.properties.item.iid)
      item.checked = !item.checked

      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调
      console.log(index)
      app.changeGoodsState(index, item)
    },
    cutCount(e) {
      if (this.data.count > 1) {
        const item = app.globalData.cartList.find(item => item.iid == this.properties.item.iid)
        item.count = item.count - 1
        this.setData({
          count: item.count
        })
        
      }
    },
    addCount(e) {
      const item = app.globalData.cartList.find(item => item.iid == this.properties.item.iid)
      item.count = item.count + 1
      this.setData({
        count: item.count
      })

    }
  }
})