import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redbag:0,
    id:'',
    data:'',
    orderid:'',//红包要用的订单id
    goodsinfo: app.globalData.goodsinfo,//商品信息
    redindex:'',//选用红包index
    reallmoney:'',//支付价格
    total_money:'',//总价格
    amount_zk:0,
    vipzou:0,
    red_pack_id:'',//红包id
  },
  // 去使用红包
  usehb:function(){
    console.log(app.globalData.goodsinfo,'全局==========')
    let id = wx.getStorageSync('orderid')
    let type=wx.getStorageSync('type')
    let redindex = this.data.redindex
    console.log(id, redindex, type,'去使用红包的参数')
    wx.redirectTo({
      url: '/pages/my/useredbag/useredbag?id=' + id + '&redindex=' + redindex +'&type='+type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.data){
       let data = JSON.parse(options.data) 
       console.log(data, '========详情页数据')
       app.globalData.goodsinfo=data
       wx.setStorageSync('orderid', data.product.id)
       wx.setStorageSync('type', data.type)
        that.setData({
          goodsinfo:data,
          vipzou: data.vip_discount,    //vip折扣
          total_money: data.total_money,//总价
          reallmoney: data.paid_money,  //实际支付的钱,
          amount_zk:data.discount_money, //总折扣
          type: data.type
        })
                
    }
    if (options.money){
      let data=JSON.parse(options.money)
      let redindex=options.regindex
      let redid = options.redid
      console.log(options.regindex, data, redid,'---------红包页面数据')
      that.setData({
        goodsinfo: data,
        vipzou: data.vip_discount,    //vip折扣
        total_money: data.total_money,//总价
        reallmoney: data.paid_money,  //实际支付的钱,
        amount_zk: data.discount_money, //总折扣
        type: data.type,
        redbag: data.red_pack_discount,
        red_pack_id: redid,
        redindex: redindex
      })
    }
  },
 
  wxpay:function(id,key){
    let that =this
    let url = app.globalData.api + 'api/mp/order/create_course_order'
    let data
    if (that.data.red_pack_id==''){
         data = {
          type: that.data.type,
          product_id: that.data.goodsinfo.product.id
        }
    }else{
      data = {
        type: that.data.type,
        red_pack_id: that.data.red_pack_id,
        product_id: that.data.goodsinfo.product.id
      }
    }
    request.sendRequest(url, 'POST',data)
      .then(function (res) {
        console.log(res, '开始支付咯')
        let pag=res.data
        wx.requestPayment({
          timeStamp: pag.timeStamp,
          nonceStr: pag.nonceStr,
          package: pag.package,
          signType: pag.signType,
          paySign: pag.paySign,
          success(res) {
          console.log(res)
            app.globalData.goodsinfo = ''
            modals.showToast('支付成功', "success")
            modals.switchtab('/pages/my/my')
           },
          fail(res) { 
            console.log(res)
            modals.showToast('支付失败', "loading")
            console.log('支付失败')
          }
        })
      })
  },
  onShow: function () {
      
  }
})