import request from '../../service/network.js'
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
// pages/home/home.js
const types = ['pop', 'new', 'sell'];
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
    currentType: 'pop'
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

  onReachBottom() {
    // 上拉加载更多 => 请求新的数据
    this._getGoodsData(this.data.currentType)
  },

  // -------------------------网络请求函数----------------------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list;
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

      //  2.2将数据设置到毒地应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);
      // 2.3将数据设置到data中的goods中
      const typekey = `goods.${type}.list`;
      const pagekey = `goods.${type}.page`;
      this.setData({
        [typekey]: oldList,
        [pagekey]: page
      })
      console.log(res)
    })
  }
})