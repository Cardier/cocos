cc.Class({
    extends: cc.Component,

    properties: {
      
    },
    onLoad: function () {
      var self=this;
      self.zhi();
    var realPath=this.path;
    console.log(realpath);
    if(!(realPath==null)){
      self.node.getComponent(cc.Sprite).spriteFrame=null;
      cc.loader.load(realPath,function(err,tex){
          console.log(tex);
          var sprite=new cc.SpriteFrame(tex);
          self.node.getComponent(cc.Sprite).spriteFrame=sprite;
          self.node.width=97;
          self.node.height=116; 
      });
    }
    this.action = cc.fadeOut(2.0);
    var finished = cc.callFunc(function () {
      this.node.destroy();
     }, this);
    this.node.runAction(cc.sequence( cc.delayTime(1), this.action, finished))
     this.touchone =false
   this.touch();
  
    },
    touch:function(){
        var touchStart = function (event) {
        this.touchx = event.touch.getLocationX();
           this.touchy = event.touch.getLocationY();
           if(!this.touchone){
           Global.qscroe += 2
               this.touchone =true
           }
          Global.one.active = true
            Global.hammer.active = true
         Global.one.position = cc.p(this.touchx,this.touchy + 75);
         Global.hammer.position = cc.p(this.touchx,this.touchy + 125);
          return true
        }
        var touchEnd = function (event) {
       Global.one.active = false
        Global.hammer.active = false
         var anim = this.getComponent(cc.Animation);
          anim.play('cloud');
          anim.on('stop', this.onStop, this);
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
    },
    onStop:function(){
        this.node.active = false
    },
    zhi:function(){
        var Request ={};
        Request = GetRequest();
        this.path =Request["imgPath"];
    },
});
  function GetRequest() {
    var imgUrl = window.location.search;
    var theRequest = new Object();
    if (imgUrl.indexOf("?") != -1) {
        var str = imgUrl.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}