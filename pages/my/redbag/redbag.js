import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    page: 1,
    nomore: false,
    list:[]
  },

//  使用红包
  touse:function(){
    modals.switchtab('/pages/index/videolesson/videolesson')
  },
  onShow: function () {
    let that=this
    let url = app.globalData.api + 'api/mp/red_pack/list'
    request.sendRequest(url, 'GET')
      .then(function (res) {
        util.set('token', res.header.refresh_token)
        that.setData({
          list: res.data.data
        })
      })
  },

  
  onReachBottom: function () {
    this.fetchArticleList(this.data.page += 1)
  },
  fetchArticleList: function (pg) {
    let that = this
    if (that.data.nomore == false) {
      let url = app.globalData.api + 'api/mp/red_pack/list?page=' + pg
      request.sendRequest(url, 'get')
        .then(function (res) {
          console.log(res)
          util.set('token', res.header.refresh_token)
          if (res.data.data.length == 0) {
            console.log('没有更多了')
            that.setData({
              nomore: true
            })
          } else {
            that.setData({
              list: that.data.list.concat(res.data.data),
              pg: res.data.current_page
            })
          }
        })
    }
  },
  
})