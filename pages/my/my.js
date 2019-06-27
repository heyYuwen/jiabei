import modals from '../../utils/methods.js'
// const request = require('../../class/api/https.js')
const app = getApp()
Page({
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})