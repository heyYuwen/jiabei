import modals from '../../../utils/methods.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  help:function(){
    modals.navigate('/pages/propaganda/othertwo/othertwo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (res) {
    let id = wx.getStorageSync('shareId') // 分享产品的Id
    let idarray = [1, 2, 3]
    let that = this
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '在吗？拜托帮我点一下！220元课程优惠券免费领',
      imageUrl: '/image/img_fenxiang_dianji@2x.png',
      path: "/pages/propaganda/otherone/otherone"
    }
  }
})