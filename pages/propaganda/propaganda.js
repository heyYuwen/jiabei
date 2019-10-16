import modals from '../../utils/methods.js'
const request = require('../../utils/https.js')
const util = require('../../utils/util.js')
const app = getApp()
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
    ],
    rules1: false,
    rules2:false,
    mygroup:false,      //我的团队
  },
  // 开团助力
  starttuan:function(){
    let that=this
    util.get('token')
    let url = app.globalData.api + 'api/mp/assistance/create'
    request.sendRequest(url, 'post')
      .then(function (res) {
        util.set('token', res.header.refresh_token)
        if (res.data.status==true){
          let assistanceId =res.data.assistanceId
          wx.setStorageSync('assistanceId', assistanceId)
          modals.showToast('开团成功', "success")
          setTimeout(function(){
            // modals.navigate(urls, assistanceId)
            wx.navigateTo({
              url: '/pages/propaganda/othertwo/othertwo?assistanceId=' + assistanceId,
            })
          },500)
         
        }
        
      })
  },
  // 规则1
  rules1:function(){
    let that = this
    that.setData({
      rules1: true
    })
    setTimeout(function () {
      that.setData({
        rules1: false
      })
    }, 2500)
  },
  //规则2
  rules2:function(){
    let that=this
    that.setData({
      rules2: true
    })
    setTimeout(function(){
      that.setData({
        rules2:false
      })
    },2500)
    
  },
  // 分享
  toshare:function(){
    this.setData({
      coverwin: true
    })
  },
  // 关闭弹窗
  closewind:function(){
   this.setData({
     coverwin:false
   })
  },
  // 分享
  onShareAppMessage: function (res) {
    let id = wx.getStorageSync('all_info').id // 分享产品的Id
    console.log(id, '用户的id')
    console.log("/pages/propaganda/otherthree/otherthree?parent_id=" + id)
    let that=this
    if (res.from === 'button') {
      console.log(res.target)
       that.setData({
         win:2
       })
    }
    return {
      title: '免费送你10元红包哦',
      imageUrl:'/image/onetoone.png',
      path: "/pages/propaganda/otherthree/otherthree?parent_id="+id
    }
   
  },
  onShow:function(){
      modals.islogin()
  }

  
})