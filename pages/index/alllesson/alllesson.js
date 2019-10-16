import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({
  data: {
    alllesson:[1,2.3,3,3,3]
  },
  detail:function(e){
    let url ="/pages/index/classdetal/classdetal?id="
    let id=e.currentTarget.dataset.item
    modals.navigate(url,id)
  },
  onLoad: function (options) {
    let that=this
    let url = app.globalData.api + 'api/mp/courses'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        
        console.log(res.data.data)
        that.setData({
          list:res.data.data
        })
      })
  },
  onReady: function () {

  },

  onShow: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})