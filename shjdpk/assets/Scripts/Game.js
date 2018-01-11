cc.Class({
    extends: cc.Component,

    properties: {
       ball:{
           default:null,
           type:cc.Node
       },
       button:{
           default:null,
           type:cc.Node
       },
     
    },

    // use this for initialization
    onLoad: function () {
   
   // this.button.active = true
    },
    gameover:function(){
        this.button.active = true;
        
    },
    re:function(){
         cc.director.loadScene('Game')
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.ball.y < -320 ){
       this.gameover()
          return
      }
     },
});
