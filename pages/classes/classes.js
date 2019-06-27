var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:[
      {name:"装企营销",id:'1'},
      { name: "管理课程", id: '1' },
      { name: "装企营销", id: '1' },
      { name: "企业签单", id: '1' },
      { name: "企业内培训", id: '1' },
      { name: "热门课程", id: '1' },
      { name: "装企营销", id: '1' },
      { name: "装企营销", id: '1' }
    ],
    currentindex:0
  },
  navchange:function(e){
    console.log(e.currentTarget)
    let data = e.currentTarget.dataset
    this.setData({
      
    })
  },
  
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