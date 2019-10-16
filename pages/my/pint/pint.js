import modals from '../../../utils/methods.js'
const request = require('../../../utils/https.js')
const app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
     list:[],
     page:1,
     nomore:false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    let that=this
    util.get('token')
    let url = app.globalData.api + 'api/mp/assistance/list'  
    request.sendRequest(url, 'get')
      .then(function (res) {
        console.log(res, 'ceshi', res.header.token)
        util.set('token', res.header.refresh_token)
        that.setData({
          list: res.data.data
        })

      })
  },
  onReachBottom() {
    this.fetchArticleList(this.data.page +=1)
  },
  // 加载更过
  fetchArticleList:function(pg){
    let that=this
    if (that.data.nomore==false){
    let url = app.globalData.api + 'api/mp/assistance/list?page=' + pg
    request.sendRequest(url, 'get')
      .then(function (res) {
        console.log(res)
        util.set('token', res.header.refresh_token)
        if(res.data.data.length==0){
            console.log('没有更多了')
            that.setData({
              nomore:true
            })
        }else{
          that.setData({
            list: that.data.list.concat(res.data.data),
            pg: res.data.current_page
          })
        }
      })
    }
  },
  todetail:function(e){
    let assistanceId=e.currentTarget.dataset.id
    let url ="/pages/propaganda/othertwo/othertwo?assistanceId="
    modals.navigate(url, assistanceId)
  }
  
})