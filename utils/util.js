const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function set(k, v) {
  wx.setStorageSync(k, v)
  var timestamp = (new Date()).getTime();
  let dotime = 10080 * 1000 + timestamp
  wx.setStorageSync('dotime', dotime)
  // if (wx.getStorageSync('stime') < timestamp) {
  //   console.log('缓存到期了')
  //    wx.removeStorageSync(k);
  // } 
} 
function get(k){
  var nowtime = (new Date()).getTime();
  if (wx.getStorageSync('dotime')){
      //  之前进来了的
     let data = wx.getStorageSync(k)
      console.log('多次进入小程序，判断是否过期')
      if (nowtime > wx.getStorageSync('dotime')) {
        console.log(nowtime, wx.getStorageSync('dotime'))
        wx.removeStorageSync(k);
        console.log('过期')
        wx.navigateTo({ url: '/pages/index/login/login' })
      } else {
        console.log('没过期')
        if(!wx.getStorageSync('token')){
          wx.navigateTo({ url: '/pages/index/login/login' })
        }
      }
  }else{
    // 第一次用户体验
    
    console.log('第一次进入小程序，直接去授权')
     wx.navigateTo({ url: '/pages/index/login/login' })
  }
  
  // if (!data) {
  //   console.log('sssssss')
  //   wx.navigateTo({ url: '/pages/index/login/login' })
  // } 
}

module.exports = {
  formatTime: formatTime,
  set: set,
  get: get,
 
}
