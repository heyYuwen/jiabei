import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page: 1,
    nomore:false
  },

  onLoad: function (options) {

  },

  
  onShow: function () {
    let that=this
    that.fetchArticleList()
  },
  // 取消订单
  cancelorder:function(e){
    let that=this
    let order=e.currentTarget.dataset.item.id
    let url = app.globalData.api + 'api/mp/pay_order/cancel/' + order
    request.sendRequest(url, 'get')
      .then(function (res) {
          console.log(res.data)
           util.set('token', res.header.refresh_token)
            if (res.data.error==0){
              modals.showToast('订单取消成功', "success")
              that.onShow()
            }
      })
  },
  // 支付该订单
  topay:function(e){
    let that=this
    let order = e.currentTarget.dataset.item.id
    let url = app.globalData.api + 'api/mp/order/pay'
    let data = {
      order_id: order,
    }
    request.sendRequest(url, 'post', data)
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
        let or_data = res.data
        wx.requestPayment({
          timeStamp: or_data.timeStamp,
          nonceStr: or_data.nonceStr,
          package: or_data.package,
          signType: or_data.signType,
          paySign: or_data.paySign,
          success(res) {
            modals.showToast('支付成功', "success")
            that.onShow()
          },
          fail(res) {
            modals.showToast('支付失败', "loading")
          }
        })
      })
  },
  // 退款
  backmoney:function(e){
    let that = this
    let order = e.currentTarget.dataset.item.id
    let url = app.globalData.api + 'api/mp/pay_order/apply_refund/' + order
    let data={
      reason: "不想要"
    }
    request.sendRequest(url, 'get',data)
      .then(function (res) {
           util.set('token', res.header.refresh_token)
            console.log(res.data)
            that.onShow()
      })
  },
  // 触底事件
  onReachBottom() {
    this.fetchArticleList(this.data.page += 1)
  },
  // 加载更多
  fetchArticleList: function (pg) {
    let that = this
    if (that.data.nomore == false) {
      let url = app.globalData.api + 'api/mp/pay_order?page=' + pg
      request.sendRequest(url, 'get')
        .then(function (res) {
          util.set('token', res.header.refresh_token)
          if (res.data.data.length == 0) {
            console.log('没有更多了')
            that.setData({
              nomore: true
            })
          } else {
            console.log(res.data.data)
            that.setData({
              list: that.data.list.concat(res.data.data),
              pg: res.data.current_page
            })
          }
        })
    }
  },
  onShareAppMessage: function () {

  }
})