import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    total:'',
    list:[
    ]
  },
  select:function(e){
    let that=this
    let index=e.currentTarget.dataset.index
      that.setData({
        current: index,
        total: that.data.list[index].price,
        type: that.data.list[index].type
      })
  
  },
  // 价格
  onLoad: function (options) {
    let that=this
    let url = app.globalData.api + 'api/mp/club_card/items'
    request.sendRequest(url, 'get')
      .then(function (res) {
         that.setData({
           list:res.data,
           total: res.data[0].price,
           type: res.data[0].type
         })
      })
  },
  tobuy:function(){
    let  that=this
    let type=that.data.type
    let url = app.globalData.api + 'api/mp/club_card/create_order'
    let data={
      type:type,
      remark:'开通会员'
    }
    request.sendRequest(url, 'post',data)
      .then(function (res) {
        console.log(res)
        that.pay(res.data.order.id)
      })
  },
  pay:function(id){
    let url = app.globalData.api + 'api/mp/order/pay'
    let data = {
      order_id: id,
    }
    request.sendRequest(url, 'post', data)
      .then(function (res) {
        console.log(res.data)
        let or_data=res.data
           wx.requestPayment({
             timeStamp: or_data.timeStamp,
             nonceStr: or_data.nonceStr,
             package: or_data.package,
             signType: or_data.signType,
             paySign: or_data.paySign,
              success(res) {
                modals.showToast('支付成功', "success")
                modals.switchtab('/pages/my/my')
              },
              fail(res) {
                modals.showToast('支付失败', "loading")
              }
          })
      })
   
  }
})