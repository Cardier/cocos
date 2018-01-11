cc.Class({
    extends: cc.Component,

    properties: {
       jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.zhi();
        if(this.music===undefined){
            cc.audioEngine.playMusic(this.jumpAudio,true);
        }else{
            this.current = cc.audioEngine.play(""+this.music, true, 4);   
        }
    },

    zhi:function(){
        var Request ={};
        Request = GetRequest();
        this.music = Request["music"];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
function GetRequest() {
  var url = window.location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
  }
  return theRequest;
}

