import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parent_id:'',
    myid:''
  },
  onLoad: function (options) {
    console.log(options)
    if (options.parent_id){
        console.log(options.parent_id, '分1享者id')
        this.setData({
          parent_id: options.parent_id
        })
    }
  },
  help: function () {
    if(wx.getStorageSync('token')){
      let that = this
      let url = app.globalData.api + '/api/mp/share'
      let data = {
        parent_id: that.data.parent_id
      }
      request.sendRequest(url, 'get', data)
        .then(function (res) {
          console.log(res)
          util.set('token', res.header.refresh_token)
          if (res.data.error == 0) {
            modals.showToast('领取成功', "success")
          } else if (res.data.error == 1) {
            modals.showToast('你不是新用户', "loading")
          } else if (res.data.error == 2) {
            modals.showToast('非法领取', "loading")
          } else {
            modals.showToast('该用户不存在', "loading")
          }

        })
    }else{
      wx.navigateTo({
        url: '/pages/index/login/login',
      })
    }
    
  },
  touse:function(){
    modals.switchtab('/pages/index/index')
  },
  iwant:function(){
    modals.switchtab('/pages/propaganda/propaganda')
  },
  
  onShow: function () {
    util.get('token')
  }

 
})