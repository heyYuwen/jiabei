import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const util =require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navactive:1,
    poster:"https://img.zcool.cn/community/01cb6e5d021234a801205e4b5fb2ac.jpg@1280w_1l_2o_100sh.jpg",
    cover:true,
    videoPlay: null,
    nav:["介绍","目录","评论"],
    video: '',
    time:0,
    currentindex:'', //当前视频索引
    currentid:'',    //当前视频id
    indexof:'',       //试看索引
    plwind:false,
    list:'', //视频列表
    pl_value:'',//评论
    blue:2,
    videoid:'',     //课程id
    lessondetail:'',//本课程详情
    phonetype: app.globalData.phonetype,
    playdtime:'',   //历史播放记录
  },
  // 视频加载中
  videowating(){
  modals.showToast('加载中','loading')
  },
  // 开始试看
  start:function(){
    let that=this
    that.setData({
     cover:false,
     time:0,
     
   })
   console.log(that.data.cover)
  },
  stratplay(e){
    console.log(e)
  },
  // 试看时间到啦
  playa(e) {
    let that = this
    that.setData({
      currentindex: that.data.indexof
    })
    let lastid = this.data.currentid
    let string = JSON.stringify(lastid)
    var currenttime = e.detail.currentTime
    var videoContext = wx.createVideoContext('s'+string)
    app.globalData.lessontime=currenttime
    if (currenttime >= 120) {//试看时间10秒
      console.log('时间到了')
      videoContext.stop()
      that.setData({
        cover: true,
        currentindex:''
      })
    }
  },
  playb(e) {
    let that = this
    let lastid = this.data.currentid
    var currenttime = e.detail.currentTime
    app.globalData.lessontime = currenttime
  },
  // 点击视频列表
  shikan:function(event){
    let that=this
    let id=event.currentTarget.dataset.id
    let indexof = event.currentTarget.dataset.index
    let lastid = that.data.currentid
    app.globalData.lessonid = id
    that.setData({
      video:that.data.list[indexof].video_url,
      indexof: indexof,
      cover: true,
      currentid: id,
      currentindex: ''
    })
    that.lookedtime(id)
   
  },
  // 换看全部视频开始
  allvideo:function(e){
    let that=this
   that.setData({
     currentindex: that.data.indexof
   })
    
  },
  // 课程详情
  onLoad: function (options) {
    let id = options.id
    let that=this
    app.globalData.lessontype='video'
    
    let url = app.globalData.api + 'api/mp/videos/'+id
    request.sendRequest(url, 'GET')
      .then(function (res) {
        console.log(res.data)
        that.setData({
          lessondetail:res.data,
          list: res.data.detail,
          videoid:id,
          video: res.data.detail[0].video_url,
          currentid: res.data.detail[0].id,
          indexof: 0
        })
        that.lookedtime(res.data.detail[0].id)

      })
    
  
    
  },
  // 评论弹窗
  pinlun:function(){
   this.setData({
     plwind:true
   })
  },
  // 监听输入
  mywrite:function(e){
    let  that=this
    if(e.detail.value.length>0){
      that.setData({
        blue:1,
        pl_value: e.detail.value
      })
    }
  },
  // 评论
  submit:function(e){
    let that=this
    let url = app.globalData.api + 'api/mp/discuss/add'
    let data={
      object_id: that.data.videoid,
      object_type:'video',
      content:that.data.pl_value
    }
    request.sendRequest(url, 'post',data)
      .then(function (res) {
        util.set('token', res.header.refresh_token)
        if (res.data.error==0){
          modals.showToast('评论成功','success')
          that.setData({
            plwind: false
          })
        }
       
      })
  
  },
  // 导航
  changetab:function(event){
   let curindex=event.currentTarget.dataset.index
   this.setData({
     navactive: curindex,
   })
  },
  // 立即购买
  buy:function(){
          let id = this.data.videoid
          let url = app.globalData.api + 'api/mp/order/course_preorder'
          let data={
            product_id: id,
            type:'video'
          }
          request.sendRequest(url, 'get',data)
            .then(function (res) {
              console.log(res)
              let item=res.data.data
              util.set('token', res.header.refresh_token)
              if(res.data.error==1){
                modals.showToast(res.data.msg, "loading")
              }else{
                console.log(res.data.data)
                let itemdata=JSON.stringify(item)
                let url = '/pages/my/makesure/makesure?data='
                modals.navigate(url, itemdata)
              }
              
            })
       
  },
  
  onShareAppMessage: function () {
    let id = this.data.videoid // 分享产品的Id
    console.log(id, '用户的id')
    let that = this
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '快来和我一起学习吧',
      path: "/pages/index/videodetail/videodetail?id=" + id
    }
  },
  onShow:function(){
      util.get('token')
      console.log(wx.getStorageSync('token'))
  } ,
  // 存下退出该页面的视频播放时间
  onUnload: function () {
    let that=this
   console.log('退出啊 ')
    let url = app.globalData.api + 'api/mp/resource/set_time'
    let data={
       type: app.globalData.lessontype,
       browse_time: app.globalData.lessontime,
      product_id: that.data.currentid
    }
    request.sendRequest(url, 'post', data)
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
      })

  },
  // 查询观看历史时间
  lookedtime:function(id){
    console.log('视频id',id)
    let that=this
    let url = app.globalData.api +  "api/mp/resource/get_time"
    let data={
      type:'video',
      product_id: id
    }
    request.sendRequest(url, 'get', data)
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
        let timeer = JSON.parse(res.data.data.browse_time)
        let z = Math.floor(timeer)
        that.setData({
          playdtime: z
        })
       
      })

  }
})