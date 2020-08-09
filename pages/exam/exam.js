// pages/exam/exam.js
//创建audio控件
const myaudio = wx.createInnerAudioContext(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: [{ id: 1, name: '已掌握', status:true }, { id: 2, name: '已关注', status:false }],
    chooseparameter: 1,
    examlist:[
      {id:1,imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596874786864&di=e00d0a34b7365202f1a653e11c65d655&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic%2Fcover%2F00%2F07%2F29%2F5753c16a192af_610.jpg",name:"apple"},
      {id:3,imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596874981966&di=c4baadb213f19b19adffa2cd471b6afa&imgtype=0&src=http%3A%2F%2Fimg1.tbcdn.cn%2Ftfscom%2Fi3%2F707072639%2FTB25qtpmXXXXXcfXXXXXXXXXXXX_%2521%2521707072639.jpg",name:"pear"},
      {id:5,imgsrc:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1607972489,1530129133&fm=26&gp=0.jpg",name:"banana"},
      {id:7,imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596875125365&di=20168c32592664b40cf311fcfc5af708&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F03%2F02%2F59009141d7835_610.jpg",name:"orange"}
    ],
  },

  //音频播放  
  audioPlay(e) {
    console.log(e.currentTarget.dataset)
    var that = this,
    key = e.currentTarget.dataset.key,   //序列，0/1/2/3
    auword = e.currentTarget.dataset.name,  //单词名
    examlist = that.data.examlist;

    // console.log(id)
    // console.log(key)

    examlist.forEach((item, i, array) => {
      item.status = false;
      if (i == key) {
        item.status = true;
      }
    })

    // console.log(studylist)
    that.setData({
      examlist: examlist,
    })

    myaudio.autoplay = true;
    //播放音频地址
    var vidSrc = 'http://dict.youdao.com/dictvoice?audio='+auword+'&type=2'
    // console.log(vidSrc)
    myaudio.src = vidSrc;
    myaudio.play();

    //开始监听
    myaudio.onPlay(() => {
      console.log('开始播放');
    })

    //结束监听
    myaudio.onEnded(() => {
      console.log('自动播放完毕');
      that.setData({
        ["examlist["+key+"].status"]: false,
      })
    })

    //错误回调
    myaudio.onError((err) => {
      console.log(err); 
      that.setData({
        ["examlist["+key+"].status"]: false,
      })
      return
    })

  },

   // 参数点击响应事件
   parameterTap:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    // console.log(e.currentTarget.dataset.id)
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter


    for (var i = 0; i < parameterList.length; i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].status = true;
      }
      else{
        parameterList[i].status = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList,
      chooseparameter: this_checked
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