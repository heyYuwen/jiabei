import modals from '../../utils/methods.js'
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    info:'',
    username:'',
    phonetype: app.globalData.phonetype
  },
  onLoad: function (options) {
    
  },
  tomyself:function(){
    modals.navigate('/pages/my/myself/myself')
  },
  myredpag:function(){
    modals.navigate('/pages/my/redbag/redbag')
  },
  myorder:function(){
    modals.navigate('/pages/my/orderlist/orderlist')
  },
  jifen:function(){
    modals.navigate('/pages/my/integral/integral')
  },
  vipcenter:function(){
    modals.navigate('/pages/my/vipcenter/vipcenter')
  },
  mychangecode:function(){
    modals.navigate('/pages/my/exchange/exchange')
  },
  pint:function(){
    modals.navigate('/pages/my/pint/pint')
  },
  
  onShow: function () {
    util.get('token')
    this.setData({
      info: wx.getStorageSync('uesrinfo').userInfo,
      username: wx.getStorageSync('username')
    })
  }

})