cc.Class({
    extends: cc.Component,

    properties: {
 
    },
    onLoad: function () {
    this.action = cc.fadeOut(1.0);
    var finished = cc.callFunc(function () {
    this.node.destroy()
     }, this);
    this.node.runAction(cc.sequence( cc.delayTime(1), this.action, finished))
     this.touchone =false
   this.touch()
  
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
         Global.one.position = cc.p(this.touchx,this.touchy + 10);
         Global.hammer.position = cc.p(this.touchx+70,this.touchy + 145);
          return true
        }
        var touchEnd = function (event) {
            Global.one.active = false
            Global.hammer.active = false
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
    },
    onStop:function(){
        this.node.active = false
    }
 
});
