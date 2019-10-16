import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoles:[1,2,3,3,3,3]
  },
  // 详情
  todetail:function(e){
    let id=e.currentTarget.dataset.item
    let url = '/pages/index/videodetail/videodetail?id='
    modals.navigate(url,id)
  },
  onLoad: function (options) {
    let that=this
    let url = app.globalData.api + 'api/mp/videos'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        
        that.setData({
          list: res.data.data
        })
      })
  },

  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})