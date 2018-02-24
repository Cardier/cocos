cc.Class({
    extends: cc.Component,

    properties: {
      followSpeed: 1000
    },

    // use this for initialization
    onLoad: function () {
        this.life = 2;
      // this.move()
    },
      onCollisionEnter: function (other, self) {
        this.life -= 1
        if(this.life === 0){
        this.bomb()
        }
    },
    bomb:function(){
        
    var anim = this.getComponent(cc.Animation);
     anim.play();
     anim.on('stop', this.onStop, this);
    },
   onStop:function(){
       Global.qscroe += 1
       this.node.destroy()
   },
    move:function(){
      var self = this
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) { 
                //实现 onTouchBegan 事件回调函数
                   var x = touch.getLocationX()
                 var y = touch.getLocationY()
            //this.hj.runAction(cc.moveTo(3,cc.p(x,y)))
              return true
            }.bind(self),
            onTouchMoved: function (touch, event) {         // 触摸移动时触发
                 var x = touch.getLocationX()
                 var y = touch.getLocationY()
                  //var touchLoc = this.parent.convertTouchToNodeSpaceAR(event);
                //this.node.setPosition(new cc.Vec2(x,y))
                
                //this.node.setPosition(touchLoc)
                this.node.runAction(cc.moveTo(3,cc.p(x,y)))
            }.bind(self),
            onTouchEnded: function (touch, event) {         // 点击事件结束处理
          
            }.bind(self)
        });
        cc.eventManager.addListener(listener1, this.node);
    },
    update: function (dt) {
        var f=cc.find("Canvas/feiji_02");
        //this.moveToPos=this.node.convertToNodeSpace(f.position);
        this.moveToPos=f.position;
        //var oldPos = this.node.convertToNodeSpace(this.node.position);
        var oldPos = this.node.position;
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        this.node.setPosition(newPos);
    }
});

