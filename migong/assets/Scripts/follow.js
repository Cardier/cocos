cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Node
    }
  },

  // use this for initialization
  onLoad: function () {
    this.zhi();
    if (!this.target) {
      return
    }
    // console.log("level:"+this.level);
    var num = parseInt(this.level);
    // num=1;
    if (num === 2) {
      // console.log(num);
      this.target.x = 633
      this.target.y = 1586
    }
    if (num === 1) {
      // console.log(num);
      this.target.x = 242
      this.target.y = 1120
    }
    if (num === 3) {
      // console.log(num);
      this.target.x = 1615
      this.target.y = 1250
    }
    // console.log(this.target);
    // var tagetX=this.targetX;
    // var targetY=this.targetY-500;

    var follow = cc.follow(this.target)
    this.node.runAction(follow)
  },
  zhi:function(){
    var Request = new Object();
    Request = GetRequest();
    var a
    a = Request["rank"];
    var b
    b="_aa"+a+"bb-";
    this.i= hex_md5(b)
    this.url=Request["url"]
    this.level=Request["level"]
  },
})
function GetRequest() {
  var url = window.location.search
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

