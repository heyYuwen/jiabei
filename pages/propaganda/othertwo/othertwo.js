import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
Page({

 
  data: {
    team: [
      { img: "/image/index/1 (1).jpg", id: '1' },
      { img: "/image/index/1 (2).jpg", id: '1' },
      { img: "/image/index/1 (3).jpg", id: '1' },
      { img: '/image/index/ABC.jpg', id: '77' },
    ],
    success:false,
    assistanceId:'', //团id
    list:'',
    my:false,
    coverwin:false,
    code:'',
    sharequan:false,//海报
    codeimg:'',
    shareImg:'',//海报图片
  },

  onLoad: function (options) {
    // 团id
    let assistanceId = options.assistanceId
    let that=this
    that.setData({
      assistanceId: assistanceId
    })
    if(options.my){
      that.setData({
          my:true
      })
    }
    // 获取手机的屏幕长宽
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenWidth)
        that.setData({
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth
        })
      },
    })
  },
 
  onShow: function () {
    let that=this
    let assistanceId = this.data.assistanceId
    let url = app.globalData.api + 'api/mp/assistance/detail/' + assistanceId
    request.sendRequest(url, 'get')
      .then(function (res) {
        that.setData({
           list:res.data.data
        })
        if (res.data.data.legnth == 7) {
            that.setData({
               success:true
            })
        }

      })
  },
  // 分享弹窗
  share:function(){
    this.setData({
      coverwin: true
    })
  },
  // 关闭弹窗
  closewind: function () {
    this.setData({
      coverwin: false
    })
  },
  onShareAppMessage: function (res) {
    let id = wx.getStorageSync('shareId') // 分享产品的Id
    let idarray = [1, 2, 3]
    let that = this
    let assistanceId = that.data.assistanceId
    // console.log(assistanceId)
    if (res.from === 'button') {
    }
    return {
      title: '在吗？拜托帮我点一下！220元课程优惠券免费领',
      imageUrl: '/image/img_fenxiang_dianji@2x.png',
      path: "/pages/propaganda/otherone/otherone?assistanceId="+assistanceId
    }

  },
  //生成海报的二维码
  becomeimg: function () {
    let that=this
    wx.request({
      url: app.globalData.api + 'api/mp/wechat_qr_code/get',
      data:{
        team_id: that.data.assistanceId,
        path: "pages/propaganda/otherone/otherone"
      },
      encoding:'null',
      method:'get',
      responseType: 'arraybuffer',
      success(res){
        console.log(res,'11111111111111111111111111111')
        var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
        console.log(src2)
        var codeimg = "data:image/png;base64," + src2
          that.setData({
              coverwin: false,
              sharequan: true,
              codeimg: codeimg
          })
              that.aa(src2)
      }
    })
  },
  
  aa:function(codeimg) {
    let username=wx.getStorageSync('username')
    let that = this
    let promise = new Promise((resolve, reject) => {
      const filePath = `${wx.env.USER_DATA_PATH}/temp_image.jpeg`;
      const buffer = wx.base64ToArrayBuffer(codeimg);
      wx.getFileSystemManager().writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success() {
          resolve(filePath);
          console.log(filePath, 'sssssssssssssssssssssss')
        },
        fail() {
          reject(new Error('ERROR_BASE64SRC_WRITE'));
          console.log('shibai')
        },
      });
    }); 

    var ctx = wx.createCanvasContext('myCanvas', this);
    promise.then(res => {
      console.log(res)
          let bgimage = '/image/fenx.png'
          const ctx = wx.createCanvasContext('myCanvas')
          let bgwidth = that.data.screenWidth * 0.74
          let letfbg = (that.data.screenWidth * 0.26) / 2
          let bgheight = bgwidth * 1.52
          console.log(bgwidth, letfbg)
          ctx.drawImage(bgimage, 0, 0, bgwidth, bgheight)
          ctx.save()
          ctx.beginPath()
         ctx.drawImage(res, bgwidth-60, bgheight - 60, 50, 50)
          ctx.setFillStyle('#ffffff')
          ctx.setFontSize(0.04 * bgwidth)
          ctx.setTextAlign('center')
          ctx.fillText(username, bgwidth / 2,  1.04*bgwidth)
          ctx.draw(false, () => {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              fileType: 'png',
              success: res => {
                console.log(res.tempFilePath);
                that.setData({
                  shareImg: res.tempFilePath
                })
              },
              fail(err) {
                console.log('shibai')
              }
            })
          })
        }, err => {
          console.log(err)
        })
  },
  saveposter() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                  that.setData({
                    sharequan: false
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {
              that.setData({
                openSet: true
              })
            }
          })
        } else {
          // 有则直接保存
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
})
