import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    current:'s',
    orderid:'',
    type:''
  },
  onLoad:function(opt){
    console.log(opt.id,'红包页面接受参数', opt.redindex,opt.type)
    let that=this
    that.setData({
      orderid: opt.id,
      type:opt.type
    })
    if (opt.redindex){
      this.setData({
        current: opt.redindex
        })
    }
  },
  change:function(e){
    let that=this
    let item=e.currentTarget.dataset
    let id=item.item.id
   
    let url = app.globalData.api + 'api/mp/red_pack/choose/' + id
    let data={
      product_id: that.data.orderid,
      type: that.data.type
    }
    request.sendRequest(url, 'get',data)
      .then(function (res) {
         if(res.data.error==0){
              that.setData({
                current: item.index
              })
              let money = JSON.stringify(res.data.data)
              console.log(money, 'ssssssssssss')
              wx.redirectTo({
                url: "/pages/my/makesure/makesure?money=" + money + '&regindex=' + item.index+'&redid='+id,
              })
         }else{
           modals.showToast(res.data.msg, 'loading')
         }

      })

    

  },
  onShow: function () {
    let that = this
    let url = app.globalData.api + 'api/mp/red_pack/list'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        that.setData({
          list: res.data.data
        })
      })
  },
  
})