import request from '../../service/network.js'
import {
  formatTime
} from '../../utils/util'
import {
  getDetailData,
  getrecommend
} from '../../service/detail.js'
// pages/detail/detail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    result: {},
    shopInfo: {},
    detailInfo: {},
    recommend: [],
    rate: [],
    itemInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const iid = options.id
    this.setData({
      iid,
    })
    this._getDetailData(iid);
    this._getrecommend();


  },
  _getDetailData(iid) {
    getDetailData(iid).then(res => {
      const result = res.data.result;
      // 1.取出顶部的图片
      const topImages = result.itemInfo.topImages;
      // 2.创建shopInfo对象
      const shopInfo = result.shopInfo;
      // 3.获取detailInfo信息
      const detailInfo = result.detailInfo;
      // 4.创建itemInfo对象
      const itemInfo = result.itemInfo;
      // 5.获取评论信息
      const rate = result.rate.list;
      console.log(result)
      this.setData({
        topImages,
        result,
        shopInfo,
        detailInfo,
        rate,
        itemInfo
      })

    }).catch(err => {
      console.log(res)
    })
  },
  _getrecommend() {
    getrecommend().then(res => {
      const recommend = res.data.data.list;
      this.setData({
        recommend
      })

    }).catch(err => {

    })
  },
  onAddCart() {
    //1.获取商品对象
    const obj = {};
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.itemInfo.title;
    obj.price = this.data.itemInfo.lowPrice;
    obj.highPrice=this.data.itemInfo.highPrice;
    obj.name=this.data.shopInfo.name;
    obj.discount=this.data.result.promotions.list;
    // console.log(obj)

    app.addToCart(obj)

    wx.showToast({
      title: '添加购物车成功',
    })
  }

})