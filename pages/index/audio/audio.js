import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audiolist:[
      { name:"关于软装的大的几类",audio:"",price:"0"},
      { name: "关于软装的大的几类", audio: "", price: "12" },
      { name: "关于软装的大的几类", audio: "", price: "12" }
    ],
    list:''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let url = app.globalData.api + 'api/mp/audios'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        console.log(res,'ssssssssssss')
        that.setData({
          list: res.data.data
        })
      })
  },
 
  audiodetail:function(e){
    console.log(e.currentTarget.dataset.id,'音频id')
    let audioid = e.currentTarget.dataset.id
    let url = '/pages/index/audio/audiodetail/audiodetail?id='
    modals.navigate(url, audioid)
  },
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   util.get('token')
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