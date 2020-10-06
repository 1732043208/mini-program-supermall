App({
  addToCart(obj) {
    //1.判断商品是否已经加进来了
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1,
        obj.checked = true;
      this.globalData.cartList.push(obj)
      // console.log(this.globalData.cartList)
    }

    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  cutToCart(obj) {
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count = oldInfo.count - 1
    }
     // 2.购物车回调
     if (this.addCartCallback) {
      this.addCartCallback()
    }
  },

  onLaunch() {
    let _this = this
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        console.log(res.model)
        let iphoneArr = ['iPhone X', 'iPhone 11', 'iPhone 11 Pro Max']
        iphoneArr.forEach(function (item) {
          if (modelmes.search(item) != -1) {
            _this.globalData.isIphone = true
          }
        })
      }
    })
  },
  globalData: {
    cartList: [],
    isIphone: false
  }
})