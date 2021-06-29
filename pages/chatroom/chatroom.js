// pages/chatroom/chatroom.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "",
    sendBT_Disabled: true,
    chatLists: [
      {
        tag: "robot",
        avatar: "../../src/image/a1.jpg",
        msg: "你好，我是小V"
      },
      {
        tag: "robot",
        avatar: "../../src/image/a1.jpg",
        msg: "现在可以开始和我聊天唷~"
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
        avatar: app.globalData.userInfo.avatarUrl,
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
      //发送网络请求
      let url=app.globalData.host;
      wx.request({
        url: url+'/chat', //仅为示例，并非真实的接口地址
        data: {
          msg: msg.msg
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',//请求的方法,方法值要大写
        success: function (res) {//请求成功的回调函数
          console.log(res)
          let chatLists = _this.data.chatLists;
          let tmpstr=res.data.Reply.replace(/腾讯小龙女/, "小V");
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
        },
        fail: function (err) {
          console.log(err)
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