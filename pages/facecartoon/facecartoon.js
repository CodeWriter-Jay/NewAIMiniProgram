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
    faceInfo: null, //人脸信息
    map: {  //人脸映射关系
      expression: {
        type: {
          none: '不笑',
          smile: '微笑',
          laugh: '大笑'
        },
      },
      gender: {
        type: {
          male: '男性',
          female: '女性'
        }
      },
      glasses: {
        type: {
          none: '无眼镜',
          common: '普通眼镜',
          sun: '墨镜'
        }
      },
      emotion: {
        type: {
          angry: '愤怒',
          disgust: '厌恶',
          fear: '恐惧',
          happy: '高兴',
          sad: '伤心',
          surprise: '惊讶',
          neutral: '无表情',
          pouty: '撅嘴',
          grimace: '鬼脸'
        }
      },
    },
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
      title: '人脸检测中',
    })
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-process/v1/selfie_anime?access_token=' + this.data.access_token,
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: fileStr,
        type:'anime'
      },
      success: res => {
        wx.hideLoading();
        if (res.data.error_code == 222202) {
          wx.showToast({
            title: '未检测到人脸',
            icon: 'error'
          })
        } else {
          const base64ImgUrl = "data:image/png;base64," + res.data.image;
          this.setData({
            imagePath:base64ImgUrl
          })
        }
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