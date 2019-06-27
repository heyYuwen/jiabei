// pages/index/videodetail/videodetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:"https://img.zcool.cn/community/01cb6e5d021234a801205e4b5fb2ac.jpg@1280w_1l_2o_100sh.jpg",
    cover:true,
    videoPlay: null,

    vedio_data: [
        {
        title: '无13131（大班）',
        url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        img: 'https://img.zcool.cn/community/01cb6e5d021234a801205e4b5fb2ac.jpg@1280w_1l_2o_100sh.jpg',

      },
      {
        title: ' 如何23 1 、 2 、2423、4）',
        url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        img: 'https://img.zcool.cn/community/01cb6e5d021234a801205e4b5fb2ac.jpg@1280w_1l_2o_100sh.jpg',

      },

    ],
    _index:'s',
    nav:["介绍","目录","评论"],
    currentindex:1,
    videolist:[1,2.3,3],
    video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    time:0
  },
  start:function(){
   this.setData({
     cover:false,
     time:0
   })
    var videoContext = wx.createVideoContext('0')
    console.log(videoContext)
    videoContext.play();
  },
  playa(e) {
    let that = this
     console.log(e.detail.currentTime)
    var currenttime = e.detail.currentTime
    var videoContext = wx.createVideoContext('0')
    if (currenttime >= 10) {
      console.log('时间到了')
      videoContext.stop()
      that.setData({
        // cover: true
      })
    }
  },
//   videoplay:function(e){
//  console.log(e)
//   }
  // videoPlay: function (e) {
  //   var _index = e.currentTarget.id
  //   this.setData({
  //     _index: _index
  //   })
  //   //停止正在播放的视频
  //   var videoContextPrev = wx.createVideoContext(this.data._index)
  //   videoContextPrev.stop();

  //   setTimeout(function () {
  //     //将点击视频进行播放
  //     var videoContext = wx.createVideoContext(_index)
  //     console.log(videoContext)
  //     videoContext.play();
  //   }, 500)
  // },
  // changetab:function(event){
  //  let curindex=event.currentTarget.dataset.index
  //   console.log(curindex)
  //  this.setData({
  //    currentindex: curindex,
  //    index:curindex
  //  })
  // },
  // change:function(event){
  // console.log(event.detail.current)
  // this.setData({
  //   currentindex: event.detail.current
  // })
  // },
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
  onShareAppMessage: function () {

  }
})