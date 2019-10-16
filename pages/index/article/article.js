import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist: [
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      }
    ]
  },
  todetail:function(e){
    let id=e.currentTarget.dataset.item
    let url = "/pages/index/articledetail/articledetail?id="
    modals.navigate(url,id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let url = app.globalData.api + 'api/mp/jiabei_news'
    request.sendRequest(url, 'GET')
      .then(function (res) {
         console.log(res.data.data)
         that.setData({
           newslist:res.data.data
         })
      })
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