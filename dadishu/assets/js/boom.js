cc.Class({
    extends: cc.Component,

    properties: {
 
    },
    onLoad: function () {
    this.action = cc.fadeOut(2.0);
    var finished = cc.callFunc(function () {
    this.node.destroy()
     }, this);
    this.node.runAction(cc.sequence( cc.delayTime(1), this.action, finished))
   this.touch()
    },
    touch:function(){
        var touchStart = function (event) {
            this.touchx = event.touch.getLocationX();
           this.touchy = event.touch.getLocationY();
           Global.qscroe -= 1
        if(Global.qscroe < 0){
                Global.qscroe =0
            }
          Global.five.active = true
          Global.hammer.active = true
         Global.five.position = cc.p(this.touchx,this.touchy + 125);
         Global.hammer.position = cc.p(this.touchx,this.touchy + 125);
          return true
        }
        var touchEnd = function (event) {
         Global.five.active = false
         Global.hammer.active = false
         var anim = this.getComponent(cc.Animation);
          anim.play('kk');
          anim.on('stop', this.onStop, this);
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
    },
    onStop:function(){
        this.node.active = false
    }
 
});
