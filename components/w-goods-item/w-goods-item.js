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
      // 判断:如果点击事件下有iid这个参数才触发跳转事件
      if (e.currentTarget.dataset.iid) {
        const id = e.currentTarget.dataset.iid
        wx.navigateTo({
          url: '../../pages/detail/detail?id=' + id,
        })
      }


    }

  }
})