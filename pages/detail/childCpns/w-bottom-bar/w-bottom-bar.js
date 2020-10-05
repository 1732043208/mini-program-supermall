// pages/detail/childCpns/w-bottom-bar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isIphone:{
      type:Boolean,
      value:false
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
    onAddCart() {
      this.triggerEvent('addcart', {}, {})
    },
 
  },

})