window.score = 0;

cc.Class({
  extends: cc.Component,

  properties: {
    // 时间
    time: {
      type: cc.Label,
      default: null,
    },
    // 背景音乐
    audio: {
      url: cc.AudioClip,
      default: null,
    },
  },

  onLoad: function() {
    this.zhi();
    if(this.max===undefined||this.max===null){
        cc.find('Canvas/max').getComponent(cc.Label).string = "50ml";
    }else{
         cc.find('Canvas/max').getComponent(cc.Label).string = this.max+"ml";   
    }
    if(this.gScore===undefined||this.gScore===null){
        this.gScore=0;
        window.score=parseInt(this.gScore);
    }else{
         window.score=parseInt(this.gScore);   
    }
    cc.find('Canvas/score').getComponent(cc.Label).string = window.score+"ml";
    cc.audioEngine.play(this.audio, true, 4);
    this.end = false;
    // 游戏时间计时
    var time = 30;
    this.schedule(function Time() {
      time--;
      this.time.string = time + "s";
      if (time === 0) {
        this.unschedule(Time);
        location.replace("" + this.url + "?score=" + window.score + "&rank=" + this.i);
        this.end = true;
        cc.game.pause();
      }
    }, 1);
  },

  update: function(dt) {},
  onDestroy: function() {
    cc.audioEngine.stop(this.current);
  },
  zhi: function() {
    var Request = {};
    Request = GetRequest();
    var a;
    a = Request["rank"];
    var b;
    b = "_aa" + a + "bb-";
    this.url = Request["url"];
    this.i = hex_md5(b);
    this.music = Request["music"];
    this.gScore=Request["score"];
    this.max=Request["max"];
  },
});

function GetRequest() {
  var url = window.location.search;
  var theRequest = {};
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return theRequest;
}
