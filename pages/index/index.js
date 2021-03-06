//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎使用小程序',
    userInfo: {},
    markers: [{
      iconPath: "/images/kejicheng.png",
      id: 0,
      latitude: 31.336420,
      longitude: 120.422200,
      width: 50,
      height: 50,
    }],
    controls: [],
    polyline: [],


    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: false,
    duration: 500
  },
  onLoad(options) {
    this.fetchImageList();

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '科技城吃喝玩乐',
      path: '/pages/index/index',
      imageUrl:"/images/share.jpg",
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败，再次分享',
          icon: 'success',
          duration: 2000
        });
      },
      complete:function(res){
        console.log("用户转发了");
      }
    }
  },
  // 获取首页gallery图片列表
  fetchImageList() {
    let that = this;
    let tableID = 820;
    let objects = {
      tableID,
      order_by: 'created_at'//升序排列
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      var totalLength = res.data.objects.length;
      // var selectedIndex=Math.round(Math.random()*totalLength);
      // console.log(selectedIndex);

      that.setData({
        imgUrls: res.data.objects[totalLength - 1].image_paths
      })
    }, (err) => {
      console.dir(err)
    });
  }

})
