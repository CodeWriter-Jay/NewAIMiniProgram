const app = getApp();
const AIData = {
  grant_type: 'client_credentials',
  client_id: '27eo7Ekp4DOB2NT0coI8YVTp',
  client_secret: 'yjFc9DKZXvl11429gnzjjWe9FoV9crCe'
};

Page({
  data: {
    screenHeight: 0,
    devicePosition: true, //摄像头朝向 T前 F后
    imagePath: '',
    isShowPic: false,  //图片展示
    access_token: '',
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        this.setData({
          imagePath: res.tempImagePath,
          isShowPic: true
        })
        this.AIFace();
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  onLoad() {
    let sysInfo = wx.getSystemInfoSync();
    this.setData({
      screenHeight: sysInfo.windowHeight
    })

    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'post',
      data: AIData,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {
        this.setData({
          access_token: res.data.access_token
        });
      }
    })

  },
  AIFace() {
    const fileManager = wx.getFileSystemManager();
    const fileStr = fileManager.readFileSync(this.data.imagePath, 'base64');
    wx.showLoading({
      title: '正在动漫化',
    })
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-process/v1/selfie_anime?access_token=' + this.data.access_token,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: fileStr,
        type: 'anime'
      },
      success: res => {
        wx.hideLoading();
        const base64ImgUrl = "data:image/png;base64," + res.data.image;
        this.setData({
          imagePath: base64ImgUrl
        })
      }
    })
  },
  reverseCamera() {
    this.setData({
      devicePosition: !this.data.devicePosition
    })
  },
  choosePhoto(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          imagePath: tempFilePaths[0],
          isShowPic: true,
        })
        this.AIFace();
      }, fail(err) {
        console.log(err);
      }
    })
  },
  reChoose(e) {
    this.setData({
      isShowPic: false
    })
  }
})