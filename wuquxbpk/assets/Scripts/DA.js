cc.Class({
    extends: cc.Component,

    properties: {
      
    },
    onLoad: function () {
        console.log(1);
    },
    onCollisionEnter: function (other, self) {
        this.node.active = false
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
       this.node.x += -10;
      if(this.node.x<-3000){
           this.node.destroy()
       }
    },
    
});
