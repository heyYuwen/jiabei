import modals from '../../utils/methods.js'
Page({
  data: {
    banner:[
      { img:"/image/index/banner@2x.png" , title:'内容一'},
      { img: "/image/index/banner@2x.png", title: '内容二' },
      { img: "/image/index/banner@2x.png", title: '内容三' }
    ],
    navlist:[
      { img: "/image/index/kecheng_icon@2x.png", p: "全部课程" },
      { img: "/image/index/yingping_icon@2x.png", p: "音频课程" },
      { img: "/image/index/shiping_icon@2x.png", p: "视频课程" },
      { img: "/image/index/wenzang_icon@2x.png", p: "文章动态" },
    ],
    lessonlist:[
      { img: "/image/index/fenlei_img_display@2x.png", name: "整体软装全能班", time: "2019/5/16-30" },
      { img: "/image/index/fenlei_img_display@2x.png", name: "整体软装全能班", time: "2019/5/16-30" },
      { img: "/image/index/fenlei_img_display@2x.png", name: "整体软装全能班", time: "2019/5/16-30" },
      { img: "/image/index/fenlei_img_display@2x.png", name: "整体软装全能班", time: "2019/5/16-30" }
    ],
    newslist:[
      { img:'/image/index/jiabeidongtai_icon@2x.png',title:'愿你走出半身，归来仍是少年。14天软装速成记！',
      content:'通过14天的学习，第36期培训伙伴徐诶此都能接受的'},
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      },
      {
        img: '/image/index/jiabeidongtai_icon@2x.png', title: '愿你走出半身，归来仍是少年。14天软装速成记！',
        content: '通过14天的学习，第36期培训伙伴徐诶此都能接受的'
      }
    ]
  },
  navto:function(e){
   console.log(e.currentTarget.dataset.item)
    let index = e.currentTarget.dataset.index
   console.log(index)

   if(index==2){
     modals.navigate("/pages/index/videolesson/videolesson")
   }else if(index==0){
     modals.navigate("/pages/index/alllesson/alllesson")
   }else if(index==1){
     modals.navigate("/pages/index/audio/audio")
   }
  },
  onLoad: function () {
   
  },
  getUserInfo: function(e) {
   
  }
})
