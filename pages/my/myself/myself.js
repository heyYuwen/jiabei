import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
var util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close:false,
    sexlist:['男','女'],
    current:'0',
    sexf:false,
    name: '',
    sex:'',
    phone:'',//电话
    isphone:false
  },
  dataupname:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  // 提交名称
  subname:function(){
    let that=this
    let url = app.globalData.api + 'api/mp/members/set_nick_name'
    let data = {
      nick_name: that.data.name
    }
    request.sendRequest(url, 'POST',data)
      .then(function (res) {
        console.log(res.data)
        if (res.data.error==0){
          that.setData({
            close:false
          })
          that.onShow()
        }
      })
  },
  // 修改昵称
  changename:function(){
    let that=this
    if(that.data.close==false){
      that.setData({
        close: true
      })
    }else{
      that.setData({
        close: false
      })
    }
   
  },
  // 改变性别状态
  changesex:function(){
   this.setData({
     sexf: true
   })
  },
  // 修改性别
  selectsex:function(e){
    let  that=this
    let index=e.currentTarget.dataset.index
    that.setData({
      sexf: false,
      current: index
    })
    let url = app.globalData.api + 'api/mp/members/set_gender'
    let data = {
      gender: index+1
    }
    request.sendRequest(url, 'POST', data)
      .then(function (res) {
        console.log(res.data)
        if (res.data.error == 0) {
          
          that.setData({
            sex:index+1
          })
          that.onShow()
        }
      })
  },
  // 获取手机号
  getuerphone:function(e){
    let that=this
    console.log(e.detail,'手机好信息')
    let url = app.globalData.api + 'api/mp/members/phone'
   let data= {
      iv: e.detail.iv,
      encrypted_data: e.detail.encryptedData
    }
    request.sendRequest(url, 'POST', data)
      .then(function (res) {
        console.log(res.data,'aaaaaaa')
        that.setData({
          phone: res.data.msg,
          isphone:false
        })
        that.onShow()
      })
  },
  onLoad: function (options) {
  
  },
  onShow:function(){
    let that=this
    let url = app.globalData.api + 'api/mp/members/get_info'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
        that.setData({
          userinfo: res.data
        })
        wx.setStorageSync('username', res.data.nick_name)
        if (!res.data.phone) {
          that.setData({
            isphone: true
          })
        }
       
      })

    
  }
 
})