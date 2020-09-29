import request from '../../service/network.js'
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
// pages/home/home.js
const types = ['pop', 'new', 'sell'];
const TOP_DISTANCE = 1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0,
    images:[]
  },

  onLoad: function (options) {
    //1.请求轮播图以及推荐数据
    this._getMultiData()
    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')

  },
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index;

    this.setData({
      currentType: types[index]
    })
    // 设置currentType
  },
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  onReachBottom() {
    // 上拉加载更多 => 请求新的数据
    this._getGoodsData(this.data.currentType)
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
    // 3.修改isTabFixed属性
    const isShow2 = scrollTop >= this.data.tabScrollTop;
    if (isShow2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: isShow2
      })
    }
  },


  // -------------------------网络请求函数----------------------------
  _getMultiData() {
    getMultiData().then(res => {
      var banners = res.data.data.banner.list;
      const newarr = [];
      for (let i = 0; i < banners.length; i++) {
        newarr.push(banners[i].image)
      }
      banners = newarr;

      const recommends = res.data.data.recommend.list

      //将banners和recommends放到data中
      this.setData({
        banners: banners,
        recommends: recommends
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  _getGoodsData(type) {
    //1.获取页码
    const page = this.data.goods[type].page + 1;
    //2.发送网络请求
    getGoodsData(type, page).then(res => {
      // 2.1取出数据
      const list = res.data.data.list

      //  2.2将数据设置对应type的list中
      const oldList = this.data.goods[type].list;

      oldList.push(...list);
 
      // console.log(oldList)
      // 2.3将数据设置到data中的goods中
      const typekey = `goods.${type}.list`;
      const pagekey = `goods.${type}.page`;
      this.setData({
        [typekey]: oldList,
        [pagekey]: page,
      })
      // console.log(res)
    })
  }
})