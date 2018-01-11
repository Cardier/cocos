cc.Class({
    extends: cc.Component,

    properties: {
      bgAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
    cc.audioEngine.play(this.bgAudio,true);
        // this.zhi();
        // this.current = cc.audioEngine.play(""+this.music, true, 4);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    zhi:function(){
        var Request ={};
        Request = GetRequest();
        this.music = Request["music"];
    },
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
