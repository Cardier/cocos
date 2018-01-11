cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
       this.node.x += -5;
      if(this.node.x<-5000){
           this.node.destroy()
       }
    },
});

