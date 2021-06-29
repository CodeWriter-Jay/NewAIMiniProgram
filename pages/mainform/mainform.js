// pages/mainform/mainform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarList: [{
      "text": "对话",
      "iconPath": "/src/icons/android-default.png",
      "selectedIconPath": "/src/icons/android-active.png",
    },
    {
      "text": "翻译",
      "iconPath": "/src/icons/translator-default.png",
      "selectedIconPath": "/src/icons/translator-active.png",
    },
    {
      "text": "人脸试妆",
      "iconPath": "/src/icons/face-default.png",
      "selectedIconPath": "/src/icons/face-active.png",
    }]
  },
  tabChange(e) {
    console.log('tab change', e);
    wx.switchTab({
      url: '/pages/chatroom/chatroom',
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