
window.score=0;
cc.Class({
    extends: cc.Component,

    properties: {
        audio:{
            url:cc.AudioClip,
            default:null
        }
    },

    onLoad: function () {
        this.zhi();
        this.end = false;
        this.AddTouchEvent();
        this.flag=true;
    },
    //音效播放
    play:function(){
        this.current = cc.audioEngine.play(this.audio, false, 3);
    },
    //动画播放
    animPlay:function(){
        var anim = this.getComponent(cc.Animation);
        anim.play();
        anim.on('stop',this.onStop,this);
    },
    // 动画结束
    animStop:function(){
        var anim = this.getComponent(cc.Animation);
        anim.stop();
        // anim.on('stop',this.onstop,this);
    },
    onStop:function(){
        this.flag=true;
    },
    //音效暂停
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    //添加触摸事件
    AddTouchEvent:function () {
        var touchStart = function (event) {
            if(this.flag){
                this.flag=false;
                this.animPlay();
                this.play();
            }
            cc.find('Canvas/finger').opacity=0;
            cc.find('Canvas/finger').getComponent(cc.Animation).stop();
        };
        var touchMove = function (event) {
        };
        var touchEnd = function (event) {
            window.score += 1;
            // var url = '+' + this.change;
            // cc.loader.loadRes(url, (err, prefab)=> {
            //     var newNode = cc.instantiate(prefab);
            //     newNode.setPosition (this.node.x+320,this.node.y+ 100+504);
            //     cc.director.getScene().addChild(newNode);
            // });
            // this.animStop();
            cc.find('Canvas/score').getComponent(cc.Label).string = window.score+"ml";
            if(window.score>=660){
                location.replace("" + this.url + "?score=" + window.score + "&rank=" + this.i);
                this.end=true;
                cc.game.pause();
            }
        };
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
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
        this.gScore=Request["score"];
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