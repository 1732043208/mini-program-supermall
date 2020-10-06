import request from '../../service/network.js'
import {
  formatTime
} from '../../utils/util'
import {
  getDetailData,
  getrecommend
} from '../../service/detail.js'
// pages/detail/detail.js
const app = getApp();
const TOP_DISTANCE = 1000;
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
    itemInfo: {},
    isIphone: false,
    showBackTop: false,
  },
  onPageScroll(option) {
    // 1.取出scrollTop
    const scrollTop = option.scrollTop;

    // 2.修改showbackTop属性  
    //官方：不要在滚动的函数回调中频繁调用this.setData
    const isShow1 = scrollTop >= TOP_DISTANCE;
    if (isShow1 != this.data.showBackTop) {
      this.setData({
        showBackTop: isShow1
      })
    }
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

    this.setData({
      isIphone: app.globalData.isIphone
    })
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
      // console.log(recommend)
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
    obj.highPrice = this.data.itemInfo.highPrice;
    obj.name = this.data.shopInfo.name;
    obj.shopLogo = this.data.shopInfo.shopLogo
    obj.discount = this.data.result;

    // console.log(obj)

    app.addToCart(obj)

    wx.showToast({
      title: '添加购物车成功',
    })
  },
  sellCountFilter: function (value) {
    if (value < 10000) return value;
    return (value / 10000).toFixed(1) + '万'

  },


})