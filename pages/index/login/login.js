import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {

  },
  onGotUserInfo:function(e){
    let info =e.detail
    wx.setStorageSync('uesrinfo', info)
    wx.setStorageSync("nickname", info.userInfo.nickName)
    wx.setStorageSync("sex", info.userInfo.gender)
    let code=wx.getStorageSync('code')
    let url = app.globalData.api + 'api/mp/members/login/'
    let data={
      code:code,
      iv:info.iv,
      encrypted_data: info.encryptedData
    }
    request.sendRequest(url, 'post',data)
      .then(function (res) {
        let token=res.data.token
         util.set('token', res.data.token)
         console.log(res.data)
         console.log(token,'授权成功？')
        //  获取用户id
        let url2 = app.globalData.api + 'api/mp/members/get_info'
        request.sendRequest(url2, 'get')
          .then(function (res) {
            console.log(res.data)
              wx.setStorageSync('all_info', res.data)
              wx.setStorageSync('username', res.data.nick_name)
                // 成功后返回上一页面
                wx.navigateBack({
                  delta: 1
                })
          })
       
      })
  },

  

})