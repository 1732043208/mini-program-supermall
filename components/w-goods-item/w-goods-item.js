// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    imageItemShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    pushDetailPage(e) {
      const id = e.currentTarget.dataset.iid

      wx.navigateTo({
        url: '../../pages/detail/detail?id=' + id,
      })
      
    }

  }
})