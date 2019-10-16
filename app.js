const util = require('/utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力                           
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var res = wx.getSystemInfoSync()
    console.log(res.platform,'手机类型')
    this.globalData.phonetype = res.platform
    // 登录
    wx.login({
      success: res => {
        let code=res.code 
       wx.setStorageSync('code', code)
      }
    })
  },
  // 退出小程序时候的记录播放时间
  onHide: function () {
    console.log('退出了')
    wx.request({
      url: this.globalData.api +'api/mp/resource/set_time',
      data:{
        type:this.globalData.lessontype,
        browse_time: this.globalData.lessontime,
        product_id:this.globalData.lessonid
      },
      method:'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync('token')}`,
      },
      success:function(res){
         util.set('token', res.header.refresh_token)
      }
    })
    
  },
  globalData: {
    userInfo: null,
    api:'https://app.91jiabei.com/',
    orderinfo:'',
    goodsinfo:'',//订单也页面的商品详情
    phonetype: '',//devtools开发者工具  android安卓手机  ios苹果
    lessontype:'',
    lessonid:'',
    lessontime:''
  }
})