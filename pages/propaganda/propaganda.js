import modals from '../../utils/methods.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    win: 1,
    coverwin:false,
    team:[
      { img:"/image/index/1 (1).jpg",id:'1'},
      { img: "/image/index/1 (2).jpg", id: '1' },
      { img: "/image/index/1 (3).jpg", id: '1' },
      { img:'/image/index/ABC.jpg',id:'77'},
    ]
  },

  
  onLoad: function (options) {
    
  },

  onReady: function () {
    
  },

 
  onShow: function () {
    let that=this;
    var array=that.data.team;
    // for(let i=0;i++;i<array.length){
    //   if (array[i].id)
      
    // }
  },
  tomy:function(){
    modals.navigate("/pages/propaganda/othertwo/othertwo")
  },
  onHide: function () {
    
  },

  
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  // 分享
  toshare:function(){
    this.setData({
      coverwin: true
    })
  },
  closewind:function(){
   this.setData({
     coverwin:false
   })
  },
  // 分享
  onShareAppMessage: function (res) {
    
    let id = wx.getStorageSync('shareId') // 分享产品的Id
    let idarray=[1,2,3]
    let that=this
    if (res.from === 'button') {
      console.log(res.target)
       that.setData({
         win:2
       })
    }
    return {
      title: '在吗？拜托帮我点一下！220元课程优惠券免费领',
      imageUrl:'/image/img_fenxiang_dianji@2x.png',
      path: "/pages/propaganda/otherone/otherone" 
    }
   
  },
  onGotUserInfo:function(e){
  console.log(e)
  }

  
})