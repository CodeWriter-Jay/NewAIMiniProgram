// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    position:'front',//摄像头超前
    screenHeight:0,//窗口高度
    src:'',//照片的路径,
    isShowPic:false,//是否展示照片,
    isShowBox:false,//是否展示检测信息
    access_token:'',
    source_image:[],
    reference_images:[],
    appid:wx.getAccountInfoSync(),
    source:'/src/icons/addPic.png',
  },


  onLoad() {
    var that = this
    var sysInfo = wx.getSystemInfoSync()
    console.log('sysinfo',sysInfo.windowHeight),
    console.log('sysinfo',sysInfo),
    that.setData({
      screenHeight : sysInfo.windowHeight
    })
    wx.request({
      method:'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        // aaa那里填写自己的百度key值
        client_id: '8SB7QjOvntTPegAkKuuBP4V6',
        client_secret: '9QQMTfLs4G5OM0VQM0TIC8PNCD4KbLlp'
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success (res) {
        that.setData({
          access_token:res.data.access_token
        })
        

      },
      fail(){
        wx.showToast({
          title: "no",
        })
      }
    })
    
  },
  reverseCamera:function(){
      var tempPosition = this.data.position == 'front'? 'back':'front';
      this.setData({
        position:tempPosition
      })
  },
  takePhoto:function(){
    const ctx = wx.createCameraContext()
    var that = this
    ctx.takePhoto({
      quality:"low",
      success:(res)=>{
        this.setData({
          src:res.tempImagePath,
          isShowPic:true
        })
        console.log("调用api：")
        that.virtualMakeup()
      }
    })
  },
  //选择相册中照片
  choosePhoto:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success:function(res) {
        if(res.tempFilePaths.length > 0){
          that.setData({
            src:res.tempFilePaths[0],
            isShowPic:true,
          })
        }
      },
      fail:()=>{
        this.setData({
          src:'',
        })
      }
    })
  },
  //选择妆容
  chooseMakeup:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success:function(res1) {
        if(res1.tempFilePaths.length > 0){
          that.setData({
            source:res1.tempFilePaths[0],
          })
          console.log(res1.tempFilePaths[0]),
          console.log("调用api：")
          that.virtualMakeup()
        }
      },
      fail:()=>{
        this.setData({
          source:'',
        })
      }
    })
  },
  //重新选择照片
  reChoose:function(){
    this.setData({
      isShowPic:false,
      src:'',
      isShowBox:false,
    })
  },
  //虚拟换妆
  virtualMakeup:function(){
    var that = this
    //将图片转化为base64
    const fileManager = wx.getFileSystemManager()
    const fileStr = fileManager.readFileSync(that.data.src, 'base64')
    const souImg2=fileManager.readFileSync(that.data.source,"base64")
    wx.showLoading({
      title: '换妆中',
    })
      wx.request({
        method:'POST',
        url: 'https://aip.baidubce.com/rest/2.0/face/v1/transfer?access_token='+that.data.access_token,
        header:{
          "Content-Type":"application/json"
        },
        data:{
          appid:24476375,
          "source_image":{
            "image":fileStr,
            "image_type":"BASE64"
          },
          "reference_images":[{
            "image":souImg2,
            "image_type":"BASE64"
          }]
        },
        success:(res)=>{
          console.log("AIface:",res)
          var ImgUrl=that.getBase64ImageUrl(res.data.result.transfer_image);
          this.setData({
            src:ImgUrl,
          })
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
  },
  getBase64ImageUrl: function(data){
    var transfer_image_base64=data;
    transfer_image_base64=wx.arrayBufferToBase64(wx.base64ToArrayBuffer(transfer_image_base64));
    const transfer_image_url="data:image/png;base64,"+transfer_image_base64;
    return transfer_image_url;
  }

})
