// pages/index/index.js
var numAi = 0
var timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制按钮是否可点击
    btnState: false,
    //记录获胜次数
    winNum: 0,
    //中间的结果提示
    gameOfPlay: '',
    //用户选择的图片
    imageUserScr: '../../static/wenhao.png',
    //电脑随机的图片
    imageAiScr: '',
    //石头剪刀布图片数组
    srcs: [
      '../../static/bu.png',
      '../../static/shitou.png',
      '../../static/jiandao.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储“已获胜次数”
    var oldWinNum = wx.getStorageSync('winNum');
    // 如果有缓存就赋值，没有缓存就赋值为0
    if (oldWinNum != null && oldWinNum!=''){
      this.data.winNum = oldWinNum;
    }
    this.timerGo();
  },

  // 点击按钮
  changeForChoose(e) {
    console.log();
    if (this.data.btnState == true) {
      return;
    }

    // 获取数组中用户的石头剪刀布相应的图片
    this.setData({
      imageUserScr: this.data.srcs[e.currentTarget.id]
    });

    // 清除计时器
    clearInterval(timer);

    // 获取数据源
    var user=this.data.imageUserScr;
    var ai=this.data.imageAiScr;
    var num=this.data.winNum;
    var str='很遗憾，你输了！';

    // 判断是否获胜
    if (user == "../../static/shitou.png" && ai =="../../static/jiandao.png"){
      // 获胜后增加次数，改变文字内容，重新缓存获胜次数
      num++;
      str='恭喜你，获胜了！';
      wx.setStorageSync('winNum', num);
    };

    if (user == "../../static/jiandao.png" && ai == "../../static/bu.png"){
      num++;
      str = '恭喜你，获胜了！';
      wx.setStorageSync('winNum', num);
    };

    if (user == "../../static/bu.png" && ai == "../../static/shitou.png") {
      num++;
      str = '恭喜你，获胜了！';
      wx.setStorageSync('winNum', num);
    };

    // 平局
    if(user==ai){
      str='平局啦！';
    };

    // 刷新数据
    this.setData({
      winNum:num,
      gameOfPlay:str,
      btnState:true
    });
  },

  // 开启计时器
  timerGo(){
    timer=setInterval(this.move,100);
  },

  // ai滚动
  move(){
    // 如果大于等于3，重置
    if(numAi>=3){
      numAi=0;
    };
    this.setData({
      // 获取数组中Ai的石头剪刀布的相应图片
      imageAiScr:this.data.srcs[numAi],
    })
    numAi++;
  },

  again(){
    // 控制按钮
    if(this.data.btnState==false){
      return;
    }

    // 重新开启计时器
    this.timerGo();

    // 刷新数据
    this.setData({
      btnState:false,
      gameOfPlay:"",
      imageUserScr:'../../static/wenhao.png'
    });
  },
})