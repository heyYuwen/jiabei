import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    assistanceId:'',
  },
  onLoad: function (options) {
    console.log(options,'接受')
    if (options.assistanceId){
      console.log('直接分享朋友',options.assistanceId)
        this.setData({
          assistanceId: options.assistanceId
        })
    }
    if (options.scene){
      var scene = decodeURIComponent(options.scene)
      console.log('扫码扫码进入', scene)
      this.setData({
        assistanceId: scene
      })
    }
    
  },
  // 帮好友助力
  help:function(){
    if(wx.getStorageSync('token')){
          let that = this
         let userid = wx.getStorageSync('all_info').id
          let url = app.globalData.api + 'api/mp/assistance/join'
          let data = {
            begin_team_id: that.data.assistanceId,
            participant_id: userid
          }
          request.sendRequest(url, 'post', data)
            .then(function (res) {
              console.log(res.data)
              util.set('token', res.header.refresh_token)
              let assistanceId = that.data.assistanceId
              console.log('团id', assistanceId)
              if (res.data.error == 0) {
                let urls = "/pages/propaganda/othertwo/othertwo?assistanceId="
                modals.showToast('助力成功', "success")
                setTimeout(function () {
                  modals.navigate(urls, assistanceId)
                }, 500)
              } else if (res.data.error == 1) {
                modals.showToast('参加人数已满', "loading")
              } else if (res.data.error == 2) {
                modals.showToast('团机会已使用', "loading")
              } else {
                modals.showToast('参团失败', "loading")
              }
        })
    }else{
      wx.navigateTo({
        url: '/pages/index/login/login',
      })
    }
    
  },
  // 去使用这个红包
  touse: function () {
    modals.switchtab('/pages/index/index')
  },
  boxton:function(){
    modals.switchtab('/pages/propaganda/propaganda')
  },
  onShow:function(){
    
  }
})