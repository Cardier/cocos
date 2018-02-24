
 cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // use this for initialization
    onLoad: function () {

    },
     onCollisionEnter: function (other, self) {
    this.node.destroy()
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      this.node.y -= 600*dt
      if(this.node.y < -1000)
      {
          this.node.destroy()
      }
    },
});
