const request = require('../../../utils/https.js')
import modals from '../../../utils/methods.js'
const app = getApp()
Page({
  data: {
    marklist:['咨询课程','报名入学','报名流程','住宿推荐'],
    banner: [
      { img: "/image/index/banner@2x.png", title: '内容一' },
      { img: "/image/index/banner@2x.png", title: '内容二' },
      { img: "/image/index/banner@2x.png", title: '内容三' }
    ],
    nametext:'',
    worktext:'',
    array:['小学','初中','高中','大学'],
    typeindex:0,
    lesson:['数学','语文','生物','化学'],
    lessonindex:0,
    list:'',
    typearray:[],//一级全列表
    typelist:[],  //一级分类名称列表
    samlllist:[], //二级分类课程名称列表
    lessonlist:[],//二级分类课程全列表
    typeid:'',
    twoid:'',
    viewid:'',
    name: '',
    work: '',
    phone: '',
    major: '',
    email: '',
    edu: '',
  },
  // 滑动到表单
  tap:function(){
    console.log('滑动啊')
    this.setData({
      viewid:"target"
    })
  },
  // 表单提交
  submitform:function(e){
     let formdata=e.detail.value
     let that=this
    //  姓名
     if(formdata.name.length<2||formdata.name==''){
       that.setData({
         nametext:"请填写正确的姓名"
       })
     }else{
       that.setData({
         nametext: ""
       })
     }
    //  职业
    if (formdata.work.length < 2 || formdata.name == '') {
      that.setData({
        worktext: "请输入正确的职业"
      })
    } else {
      that.setData({
        worktext: ""
      })
    }
    // 电话
    let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    if (formdata.phone.length != 11 || !regs.test(formdata.phone)) {
      that.setData({
       phonetext: "请输入正确的手机号"
      })
    } else {
      that.setData({
        phonetext: ""
      })
    }
    // 专业
    if (formdata.major.length < 2 || formdata.major == '') {
      that.setData({
        majortext: "请输入正确的专业"
      })
    } else {
      that.setData({
        majortext: ""
      })
    }
    // 邮箱
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(formdata.email)) {
      that.setData({
        emailtext: "请输入正确的邮箱"
      })
    } else {
      that.setData({
        emailtext: ""
      })
    }
    // 学历
    if (formdata.edu.length < 2 || formdata.edu == '') {
      that.setData({
        edutext: "请输入正确的学历"
      })
    } else {
      that.setData({
        edutext: ""
      })
    }
    let url = app.globalData.api + 'api/mp/posters/submit_form' 
    let data={
      name: formdata.name,
      profession: formdata.work,
      phone: formdata.phone,
      major: formdata.major,
      email: formdata.email,
      education: formdata.edu,
      course_cate_id: that.data.typeid,
      course_id:that.data.twoid
    }
    request.sendRequest(url, 'post',data)
      .then(function (res) {
          console.log(res.data)
          if(res.data.error==0){
            modals.showToast('报名成功', 'success')
            that.setData({
              name:'',
              work:'',
              phone:'',
              major:'',
              email:'',
              edu:'',
            })
          }
      })
  },
  // 选择分类课程
  bindPickerChange: function (e) {
    let that=this
    console.log('父级', this.data.typearray[e.detail.value].id)
    this.setData({
      typeindex: e.detail.value,
      typeid: this.data.typearray[e.detail.value].id,
      samlllist:[]
    })
    let url = app.globalData.api + 'api/mp/posters/get_course_by_cate/' + this.data.typearray[e.detail.value].id
    request.sendRequest(url, 'GET')
      .then(function (res) {
        console.log(res.data.data)
        let samlllist=that.data.samlllist
        for (let i = 0; i < res.data.data.length;i++){
           samlllist.push(res.data.data[i].title)
        }
        // console.log(samlllist)
        that.setData({
          samlllist: samlllist,
          lessonlist:res.data.data
        })
      })
  },
  // 选择子分类课程
  bindlessonChange: function (e) {
    let that=this
    console.log('子级', e.detail.value)
    this.setData({
      lessonindex: e.detail.value,
      twoid: that.data.lessonlist[e.detail.value].id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let id = options.id
    let url = app.globalData.api + 'api/mp/courses/'+id
    request.sendRequest(url, 'GET')
      .then(function (res) {
          that.setData({
            list: res.data
          })
      })
      // 课程分类
    var sid
    let url2 = app.globalData.api + 'api/mp/posters/get_cates'
    request.sendRequest(url2, 'get')
      .then(function (res) {
           console.log(res.data,'分类')
        let typelist = that.data.typelist
        sid=res.data[0].id
        for (let i = 0; i < res.data.length;i++){
          typelist.push(res.data[i].name)
        }
        that.setData({
          typearray: res.data,
          typelist: typelist,
          typeid: res.data[0].id,
          
        })
        let url3 = app.globalData.api + 'api/mp/posters/get_course_by_cate/' + sid
        request.sendRequest(url3, 'GET')
          .then(function (res) {
            console.log(res.data.data,'课程')
            let samlllist2 = that.data.samlllist
            for (let i = 0; i < res.data.data.length; i++) {
              samlllist2.push(res.data.data[i].title)
            }
            that.setData({
              samlllist: samlllist2,
              lessonlist: res.data.data,
              twoid: res.data.data[0].id,
            })
          })
      })
   
  }

 
})