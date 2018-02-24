window.Global = {
    qscroe:0,
  
};
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type:cc.Node
        },
        
        score:cc.Label,
        //score2:cc.Label,
    
        genbulletspeedtime:0,
     
    },

    // use this for initialization
    onLoad: function () {
        
        var action = cc.sequence(cc.fadeOut(0),cc.fadeIn(1));
        this.canvas.runAction(action);
     
        this.end = false
      
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    
          this.score.string = Global.qscroe.toString()
          // this.score2.string = Global.qscroe.toString()
    },
    
  
   //turn:function(){
   //    if(!this.end){
   //  location.replace("http://game.guangjixinxi.com/sjjjbndgs/Index/gameRecord?score=" +  Global.qscroe.toString(2));
   //        this.end = true
   //    }
   //    this.b.active =false
   //
   //
   //
   //}
    
});
