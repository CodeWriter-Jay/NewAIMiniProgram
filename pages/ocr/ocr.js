// pages/ocr/ocr.js
const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();

Page({
  takePhoto() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        //const tempFilePaths = res.tempFilePaths;
        // console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
        let img=res.tempFilePaths[0];
        wx.compressImage({
          src: img,
          quality:20,
          success(res){
            console.log(res.tempFilePath);
            img=res.tempFilePath;
          }
        })
        let pic64=wx.getFileSystemManager().readFileSync(img, "base64");
        let url=app.globalData.host;
        wx.request({
          url: url+'/pictrans',
          data:{
            msg:pic64
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
          },
          method:"POST",
          success(res){
            console.log(res)
            let tmpstr='';
            for(let i in res.data.ImageRecord.Value)
            {
              tmpstr+=res.data.ImageRecord.Value[i].TargetText;
            }
            _this.setData({
              result:tmpstr
            })
          },
          fail:function(err){
          console.log(err)
          }
        })
      },
      fail(error) {
        console.log(error)
      }
    })
    },
    imagefromAlbum() {
      const _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: 'original',
        sourceType: ['album'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          //const tempFilePaths = res.tempFilePaths;
          // console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
          let pic64=wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
          let url=app.globalData.host;
          wx.request({
            url: url+'/pictrans',
            data:{
              msg:pic64
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
            },
            method:"POST",
            success(res){
              console.log(res)
              let tmpstr='';
              for(let i in res.data.ImageRecord.Value)
              {
                tmpstr+=res.data.ImageRecord.Value[i].TargetText;
              }
              _this.setData({
                result:tmpstr
              })
            },
            fail:function(err){
            console.log(err)
            }
          })
          
        }
      })
    },

  /**
   * 页面的初始数据
   */
  data: {
    langPickerDisplay: 'none',
    imgPath: "",
    //语音
    result:'',
    languagefrom:[
      {
        name:'自动',
        from:'auto'
      },
      {
        name:'中文',
        from:'zh'
      },
      {
        name:'英语',
        from:'en'
      },
      {
        name:'日语',
        from:'ja'
      },
      {
        name:'韩语',
        from:'ko'
      },
      {
        name:'法语',
        from:'fr'
      },
      {
        name:'西班牙语',
        from:'es'
      }
    ],
    languageto:[
      {
        name:'英语',
        to:'en'
      },
      {
        name:'中文',
        to:'zh'
      },
      {
        name:'日语',
        to:'ja'
      },
      {
        name:'韩语',
        to:'ko'
      },
      {
        name:'法语',
        to:'fr'
      },
      {
        name:'西班牙语',
        to:'es'
      }
    ],
    start:'自动',
    end:'英语',
    from:'auto',
    to:'en',
    isShow:false,
    //语音
    recordState: false, //录音状态
    content:'',//内容
  },
  //打开选择框
  openSelector(){
    this.setData({
      langPickerDisplay:'block'
    })
  },
  //关闭选择框
  closeSelector(e){
    this.setData({
      langPickerDisplay:'none',
    })
  },
  //更改语言
  bindChange:function(e){
    var indexs = e.detail.value;
    var languagefrom=this.data.languagefrom[indexs[0]].name;
    var languageto = this.data.languageto[indexs[1]].name;
    this.setData({
      start: languagefrom,
      end: languageto
    })
    var languagefrom=this.data.languagefrom[indexs[0]].from;
    var languageto = this.data.languageto[indexs[1]].to;
    this.setData({
      from: languagefrom,
      to: languageto
    })
    console.log(this.data.from);
    console.log(this.data.to)
  },

  //翻译
  translate:function(){
    var _this = this;
    let content = this.data.content;
    let from = this.data.from;
    let to = this.data.to;
    //对内容进行AI分析
    let url=app.globalData.host;
    wx.request({
      url: url+'/translate', //仅为示例，并非真实的接口地址
      data: {
        content:content,
        from:from,
        to:to
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'GET',           
      success:function (res) {
        console.log(res)
        _this.setData({
          result:res.data.TargetText
        }); 
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
   // 手动输入内容
  conInput: function (e) {
    this.setData({
    content:e.detail.value,
    })
  },
  //识别语音 -- 初始化
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath); 
      console.log('录音总时长 -->' + res.duration + 'ms'); 
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) {}
        })
        return;
      }
      var text = that.data.content + res.result;
      that.setData({
        content: text
      })
    }
  },
  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true  //录音状态
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //识别语音
    this.initRecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
    })