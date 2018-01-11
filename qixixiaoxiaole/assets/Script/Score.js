cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        score:0,
        info:{
          default:null,
          type:cc.Node
        }
    },
    
    reward:0,
    // use this for initialization
    onLoad: function () {
      this.flag=true;
    },
    setReward:function(reward){
        this.reward=reward;
        
    },
    updateScore:function(){
      var that=this;
        var com=this.node.getComponent(cc.Label);
        this.score+=this.reward;
        com.string=this.score;
        if(this.score>=150&&that.flag==true){
          that.info.opacity=255;
          setTimeout(function(){
            that.info.opacity=0;
            that.flag=false;
          },2000)
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
