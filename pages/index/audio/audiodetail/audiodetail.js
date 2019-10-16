import modals from '../../../../utils/methods.js'
const request = require('../../../../utils/https.js')
const util = require('../../../../utils/util.js')
const app = getApp()
Page({
  data: {
    wintop:false,
    played:false,
    src: '',
    ztime:0,          //音频总时长
    sliderjindu:'',   //进度条进度
    audiodetail:'',   //视频详情
    nowtime:'00:00:00',//视频现在的时长
    audio_id:'',
    alltime:'',//音频音长
    phonetype:app.globalData.phonetype
  },
 
  // 进度条
  sliderChange:function(e){
    let that=this
    this.audioCtx = wx.createAudioContext('myAudio')
    let ztime = that.data.ztime
    let value = e.detail.value
    let curtime = value / 1000 * ztime
    this.audioCtx.play()
    this.audioCtx.seek(curtime)
    that.setData({
      sliderjindu: e.detail.value,
      played: true

    })
    
    
  },
  //改变的时候停止播放
  changing:function(){
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.pause()
  },
  // 监听音频播放
  toProgress: function (e) {
    let that=this
    let jindu = parseFloat(e.detail.currentTime / e.detail.duration * 1000);
    let amount = e.detail.duration
    this.setData({
      sliderjindu: jindu,
      ztime: e.detail.duration
    });
    var a = Math.floor(e.detail.currentTime)
    that.timergz(a,2)
    app.globalData.lessontime=a
  },
  // 播放
  play: function (){
    let that=this
   
    if(that.data.played==false){//播放音频
      if (that.data.audiodetail.buyed==false){
          console.log('您还没有购买')
        modals.modalTwo('您还没有购买该音频课程，无法播放该音频课程', '播放提示','立即购买','取消')
          .then(function (res) {
            if (res.confirm==true){
              // 立即购买
               that.buy()
            }
          })
      }else{
        // 购买后的播放
         that.audioCtx.play()
          that.setData({
            played: true
          })
         that.getaudio() //获取视频
      }
    }else{
      // 暂停音频
      this.audioCtx.pause()
      that.setData({
        played: false
      })
    }
   
  },
  // 获取视频接口
  getaudio:function(){
    let that=this
    let audio = this.data.audio_id
      wx.request({
        url: app.globalData.api + 'api/mp/audios/' + audio + '/play',
        method: "get",
        success(res) {
          that.setData({
            src: res.data.url
          })
        }
      })
  },
  // 音频结束后状态 
  audioend:function(){
    console.log('结束q')
    this.setData({
      played:false
    })
  },
  // 评论
  tapbox:function(){
    let that=this
    if (that.data.audiodetail.buyed == false) {
       console.log('您没有购买该课程')
      modals.modalTwo('您还没有购买该音频课程，无法评论该课程', '评论提示', '立即购买', '取消')
        .then(function (res) {
          if (res.confirm == true) {
            // 立即购买
            that.buy()
          }
        })
    }else{
        this.setData({
          wintop: true
        })
    }
    
  },
  // 关闭弹窗
  close:function(){
    this.setData({
      wintop: false
    })
  },
  // 发送评论
  send:function(e){
   console.log(e.detail.value)
   let that=this
    let url = app.globalData.api + 'api/mp/discuss/add'
    let data={
      object_id: that.data.audio_id,
      object_type:'audio',
      content: e.detail.value.content
    }
    request.sendRequest(url, 'post',data)
      .then(function (res) {
        // console.log(res)
        util.set('token', res.header.refresh_token)
        if (res.data.error == 0) {
          modals.showToast('评论成功', 'success')
          that.setData({
            wintop: false
          })
          that.onShow()
        }
      })
  },
  onLoad: function (options) {
    var resb = wx.getSystemInfoSync()
    console.log(resb.platform, '手机类型详情')
    app.globalData.phonetype = resb.platform
    let  that=this
    let id=options.id
    that.setData({
      audio_id: id
    })
    app.globalData.lessontype='audio'
    app.globalData.lessonid=id
  },
  // 立即购买
  buy:function(){
    if(wx.getStorageSync('token')){
      let that = this
      let id = this.data.audio_id
      let url = app.globalData.api + 'api/mp/order/course_preorder'
      let data = {
        product_id: id,
        type: 'audio'
      }
      request.sendRequest(url, 'get', data)
        .then(function (res) {
          console.log(res)
          let item = res.data.data
          util.set('token', res.header.refresh_token)
          if (res.data.error == 1) {
            modals.showToast('您已购买该课程', "loading")
          } else {
            console.log(res.data.data)
            let itemdata = JSON.stringify(item)
            let url = '/pages/my/makesure/makesure?data='
            modals.navigate(url, itemdata)
          }

        })
    }else{
      wx.navigateTo({
        url: '/pages/index/login/login',
      })
    }
    


  },
  // 时分秒转化
  timergz(value,type){
    let that=this
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    // 判断秒数是否为个位数
    var result = parseInt(theTime)
    if (result<10){
      result = "0" + result;
    }else{
      result =  result;
    }
   
    // 判断分钟是否为个位数
    if ( parseInt(theTime1) > 10){
      console.log('kkk', parseInt(theTime1))
      result =   parseInt(theTime1) + ':' + result
    } else {
      result =  parseInt(theTime1) + ':' + result
    }

    // 判断小时是否为个位数
    if (theTime2 >= 10) {
          if (parseInt(theTime1) > 10) {
            result = parseInt(theTime2) + result
          } else {
            console.log('sss')
            result = parseInt(theTime2) + ":0" + result
          }
    }else{
        if (parseInt(theTime1) > 10) {
          result = '0' + parseInt(theTime2) + ':' + result
        } else {
          result = '0' + parseInt(theTime2) + ":0" + result
        }
    }
    if(type==1){
      // 总时间
      console.log(result)
      that.setData({
        alltime:result
      })
    }else if(type==2){
      that.setData({
        nowtime: result
      })
    }
  },
  onShow:function(){
    util.get('token')
    let that=this
    this.audioCtx = wx.createAudioContext('myAudio')
    let id = that.data.audio_id
    let url = app.globalData.api + 'api/mp/audios/' + id
    request.sendRequest(url, 'GET')
      .then(function (res) {
        that.setData({
          audiodetail: res.data
        })
        that.timergz(res.data.playtime_seconds, 1)
      })
    that.gettime(id)
  },
  // 分享
  onShareAppMessage: function () {
    let id = this.data.audio_id // 分享产品的Id
    let that = this
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '快来和我一起学习吧',
      path: "/pages/index/videodetail/videodetail?id=" + id
    }
  },
  //存下退出的时间
  onUnload:function(){
    let that = this
    console.log('退出啊 ')
    let url = app.globalData.api + 'api/mp/resource/set_time'
    let data = {
      type: app.globalData.lessontype,
      browse_time: app.globalData.lessontime,
      product_id: that.data.audio_id
    }
    request.sendRequest(url, 'post', data)
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
      })

  },
  // 获取音频时间
  gettime(id){
    let that = this
    let url = app.globalData.api + "api/mp/resource/get_time"
    let data = {
      type: 'audio',
      product_id: id
    }
    request.sendRequest(url, 'get', data)
      .then(function (res) {
          util.set('token', res.header.refresh_token)
          let timeer = JSON.parse(res.data.data.browse_time)
          let z = Math.floor(timeer)
          that.audioCtx.seek(timeer)
          that.timergz(z,2)
          let jindu = parseFloat(timeer/ that.data.audiodetail.playtime_seconds * 1000);
          that.setData({
            sliderjindu:jindu
          })
      })
  }
})