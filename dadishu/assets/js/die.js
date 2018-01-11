cc.Class({
    extends: cc.Component,

    properties: {
 
    },

    // use this for initialization
    onLoad: function () {
    this.action = cc.fadeOut(1.0);
    var finished = cc.callFunc(function () {
    this.node.active = false
     }, this);
     this.node.runAction(cc.sequence( cc.delayTime(2), this.action, finished))
     this.touch()
    },
    
    touch:function(){
        var touchStart = function (event) {
         
          Global.qscroe ++
          Global.one.active = true
        }
        var touchEnd = function (event) {
           Global.one.active = false
           this.node.active = false
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
