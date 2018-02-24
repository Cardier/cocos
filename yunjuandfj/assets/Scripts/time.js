cc.Class({
    extends: cc.Component,

    properties: {
       time:cc.Label,
       player:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
    this.time1 =0
    this.schedule(this.djs,1)
    
    },
     djs:function(){
          this.time1 ++;
          this.time.string =60 - this.time1.toString();
          if(this.time1>59){
              this.player.getComponent('Player').onStop()
          }
      },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      
    },
});
