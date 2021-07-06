// pages/chatroom/chatroom.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    msg: "",
    sendBT_Disabled: true,
    chatLists: [
      {
        tag: "robot",
        avatar: "../../src/image/a1.jpg",
        msg: "你好，我是智能机器人"
      },
      {
        tag: "robot",
        avatar: "../../src/image/a1.jpg",
        msg: "现在可以开始和我聊天啦~"
      }
    ]
  },

  onInputData: function (e) {
    if (e.detail.value == "") {
      this.setData({
        sendBT_Disabled: true
      })
    }
    else {
      this.setData({
        sendBT_Disabled: false
      })
    }
    this.setData({ msg: e.detail.value });
  },

  onSendClick: function () {
    if (this.data.msg != "") {
      let chatLists = this.data.chatLists;
      let msg = {
        tag: "client",
        avatar: this.data.userInfo.avatarUrl,
        msg: this.data.msg
      }
      chatLists.push(msg);
      this.setData({
        chatLists: chatLists,
        msg: '',
        sendBT_Disabled: true
      });
      this.onScrolltoBottom();

      const _this = this;
      wx.cloud.callFunction({
        name: 'sendMsg',
        data: {
          Query: msg.msg
        },
        complete: res => {
          console.log(res)

          let chatLists = _this.data.chatLists;
          let tmpstr=res.result.Reply;
          let msg = {
            tag: "robot",
            avatar: "../../src/image/a1.jpg",
            msg: tmpstr
          }
          chatLists.push(msg);
          _this.setData({
            chatLists: chatLists,
            msg: '',
          });
          _this.onScrolltoBottom();
        }
      })
    }
  },
  //滚动页面
  onScrolltoBottom: function () {
    wx.pageScrollTo({
      scrollTop: 1000000000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '需要头像信息来显示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
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