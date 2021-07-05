// pages/made-up/made-up.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minValue: 0,
    maxValue: 100,
    id: 0,
    showValue0: 0,
    showValue1: 0,
    showValue2: 0,
    showValue3: 0,
    showValue4: 0,
    ifShow: false,
    tap: [0, 0, 0, 0, 0],
    taps: [0, 0, 0, 0, 0],
    avatarUrl: null,
    avatarbase: null,
    resultbase: null,
    tempbase : null,
    increase: false, //图片添加区域隐藏
    aniStyle: true, //动画效果
    R: 0,
    G: 0,
    B: 0,
    A: 0,
    access_token:''
  },
  chooseImg() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var avater64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        that.setData({
          avatarUrl: tempFilePaths,
          avatarbase: avater64,
          resultbase: avater64,
          tempbase : avater64,
        })
      }
    })
  },
  // sliderchange: function (e) {
  //   var id = this.data.id;
  //   var value = e.detail.value;
  //   if (id == 1) { this.data.showValue1 = value };
  //   if (id == 2) { this.data.showValue2 = value };
  //   if (id == 3) { this.data.showValue3 = value };
  //   if (id == 4) { this.data.showValue4 = value };

  //   var that = this;
  //   var smoothValue = that.data.showValue1;
  //   var whiteValue = that.data.showValue2;
  //   var thinfaceValue = that.data.showValue3;
  //   var bigeyeValue = that.data.showValue4;
  //   var photo = that.data.resultbase;
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/makeup', //仅为示例，并非真实的接口地址
  //     data: {
  //       showValue1: smoothValue,
  //       showValue2: whiteValue,
  //       showValue3: thinfaceValue,
  //       showValue4: bigeyeValue,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //         tempbase: res.data.ResultImage,
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },

  section:function(){
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=24.559b1532e187d24f99044bcb80cef931.2592000.1627960373.282335-24490865', //仅为示例，并非真实的接口地址
      data: {
        image: that.data.avatarbase
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        var ImgUrl = that.getBase64ImageUrl(res.data.foreground);
        that.setData({
          avatarUrl: ImgUrl,
          tempbase: res.data.foreground,
        })
      },
      fail: function (err) {//请求成功的回调函数
        console.log(err)
      }
    })
  },
  // smooth: function () {
  //   var that = this;
  //   var show1 = this.data.showValue1;
  //   this.setData({
  //     ifShow: true,
  //     id: 1,
  //     taps: [1, 0, 0, 0, 0],
  //     showValue0: show1,
  //     increase: false,
  //     aniStyle: true,
  //   });
  // },
  // white: function () {
  //   var that = this;
  //   var show2 = this.data.showValue2;
  //   this.setData({
  //     ifShow: true,
  //     id: 2,
  //     taps: [0, 2, 0, 0, 0],
  //     showValue0: show2,
  //     increase: false,
  //     aniStyle: true,
  //   });
  // },
  // thinface: function () {
  //   var that = this;
  //   var show3 = this.data.showValue3;
  //   this.setData({
  //     ifShow: true,
  //     id: 3,
  //     taps: [0, 0, 3, 0, 0],
  //     showValue0: show3,
  //     increase: false,
  //     aniStyle: true,
  //   });
  // },
  // bigeye: function () {
  //   var that = this;
  //   var show4 = this.data.showValue4;
  //   this.setData({
  //     ifShow: true,
  //     id: 4,
  //     taps: [0, 0, 0, 4, 0],
  //     showValue0: show4,
  //     increase: false,
  //     aniStyle: true,
  //   });
  // },
  // lips: function () {
  //   var that = this;
  //   this.setData({
  //     taps: [0, 0, 0, 0, 5],
  //     ifShow: false,
  //     increase: true,
  //     aniStyle: true,
  //   });
  // },
  // zhuan: function () {
  //   var that = this;
  //   var photo = this.data.tempbase;
  //   var photo2 = this.data.avatarbase;
  //   this.setData({
  //     tap: [1, 0, 0, 0, 0],
  //   })
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //     data: {
  //       R: 178,
  //       G: 34,
  //       B: 34,
  //       A: 80,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //       });
  //       wx.request({
  //         url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //         data: {
  //           R: 178,
  //           G: 34,
  //           B: 34,
  //           A: 80,
  //           avatarbase: photo2,
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         success(res) {
  //           var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //           that.setData({
  //             resultbase : res.data.ResultImage,
  //           });
  //         },
  //         fail: function (err) {//请求成功的回调函数
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },
  // xing: function () {
  //   var that = this;
  //   var photo = this.data.tempbase;
  //   var photo2 = this.data.avatarbase;
  //   this.setData({
  //     tap: [0, 1, 0, 0, 0],
  //   });
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //     data: {
  //       R: 220,
  //       G: 20,
  //       B: 60,
  //       A: 80,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //       });
  //       wx.request({
  //         url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //         data: {
  //           R: 220,
  //           G: 20,
  //           B: 60,
  //           A: 80,
  //           avatarbase: photo2,
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         success(res) {
  //           var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //           that.setData({
  //             resultbase : res.data.ResultImage,
  //           });
  //         },
  //         fail: function (err) {//请求成功的回调函数
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },
  // niu: function () {
  //   var that = this;
  //   var photo = this.data.tempbase;
  //   var photo2 = this.data.avatarbase;
  //   this.setData({
  //     tap: [0, 0, 1, 0, 0],
  //   });
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //     data: {
  //       R: 139,
  //       G: 0,
  //       B: 0,
  //       A: 80,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //       });
  //       wx.request({
  //         url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //         data: {
  //           R: 139,
  //           G: 0,
  //           B: 0,
  //           A: 80,
  //           avatarbase: photo2,
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         success(res) {
  //           var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //           that.setData({
  //             resultbase : res.data.ResultImage,
  //           });
  //         },
  //         fail: function (err) {//请求成功的回调函数
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },
  // zheng: function () {
  //   var that = this;
  //   var photo = this.data.tempbase;
  //   var photo2 = this.data.avatarbase;
  //   this.setData({
  //     tap: [0, 0, 0, 1, 0],
  //   });
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //     data: {
  //       R: 255,
  //       G: 0,
  //       B: 0,
  //       A: 80,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //       });
  //       wx.request({
  //         url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //         data: {
  //           R: 255,
  //           G: 0,
  //           B: 0,
  //           A: 80,
  //           avatarbase: photo2,
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         success(res) {
  //           var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //           that.setData({
  //             resultbase : res.data.ResultImage,
  //           });
  //         },
  //         fail: function (err) {//请求成功的回调函数
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },
  // fen: function () {
  //   var that = this;
  //   var photo = this.data.tempbase;
  //   var photo2 = this.data.avatarbase;
  //   this.setData({
  //     tap: [0, 0, 0, 0, 1],
  //   });
  //   let url=app.globalData.host;
  //   wx.request({
  //     url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //     data: {
  //       R: 255,
  //       G: 105,
  //       B: 180,
  //       A: 80,
  //       avatarbase: photo,
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success(res) {
  //       var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //       that.setData({
  //         avatarUrl: ImgUrl,
  //       });
  //       wx.request({
  //         url: url+'/lipstick', //仅为示例，并非真实的接口地址
  //         data: {
  //           R: 255,
  //           G: 105,
  //           B: 180,
  //           A: 80,
  //           avatarbase: photo2,
  //         },
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         success(res) {
  //           var ImgUrl = that.getBase64ImageUrl(res.data.ResultImage);
  //           that.setData({
  //             resultbase : res.data.ResultImage,
  //           });
  //         },
  //         fail: function (err) {//请求成功的回调函数
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail: function (err) {//请求成功的回调函数
  //       console.log(err)
  //     }
  //   })
  // },
  getBase64ImageUrl: function (data) {
    /// 获取到base64Data
    var base64Data = data;
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data;
    /// 刷新数据
    return base64ImgUrl;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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

  },
})