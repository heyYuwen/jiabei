// pages/my/upvip/upvip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    total:'',
    list:[320,920]
  },
  select:function(){
    let that=this
    if(that.data.current==1){
      that.setData({
        current: 2,
        total:that.data.list[1]
      })
    }else{
      that.setData({
        current: 1,
        total: that.data.list[0]
      })
    }
  
  },
  onLoad: function (options) {

  },
  onShow: function () {
    let  that=this;
  if(that.data.current==1){
    that.setData({
      total:that.data.list[0]
    })
  }else{
    that.setData({
      total: that.data.list[1]
    })
  }
    
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