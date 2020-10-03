App({
  addToCart(obj) {
    //1.判断商品是否已经加进来了
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if(oldInfo){
      oldInfo.count +=1
    }else{
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
  globalData:{
    cartList:[]
  }
})