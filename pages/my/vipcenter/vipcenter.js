import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    realvip:false,
    time:''
  },
  up:function(){
    modals.navigate("/pages/my/upvip/upvip")
  },
  onLoad: function (options) {

  },
  onShow: function () {
    let that =this
      let url = app.globalData.api + 'api/mp/members/get_info'
      request.sendRequest(url, 'GET')
        .then(function (res) {
          console.log(res.data)
          util.set('token', res.header.refresh_token)
          if (!res.data.clubCard) {
             console.log('没有开通会员')
             that.setData({
               realvip:true
             })
          }else{
            that.setData({
              realvip:false,
              time: res.data.clubCard.expire_time
            })
          }

        })
  }

 
})