cc.Class({
    extends: cc.Component,

    properties: {
        time: 60,
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.updataTime,1);
        this.zhi();
        cc.audioEngine.playMusic(''+this.music,true);
    },
    updataTime:function(){//更新时间的回调函数
        this.time--;
        if(this.time<=0){
            var a = cc.find('enen_04/Score').getComponent(cc.Label).string;
            if(a>=150){
              a+=100;
            }
            location.replace(''+this.url+"?score="+a+"&rank="+this.i);
            cc.game.pause()
        }
        var com=this.getComponent(cc.Label);
        com.string=this.time+"s";
    },
     zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b="_aa"+a+"bb-";
        this.i= hex_md5(b);
        this.url = Request["url"];
        this.music = Request["music"];
    },
    // called every frame, uncomment this function to activate update callback
    //  update: function (dt) {

    //  },
});
function GetRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}