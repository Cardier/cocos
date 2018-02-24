cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
          this.schedule(this.add,6)  
    },
    add:function(){
         var scene = cc.director.getScene();
                var bullet = cc.instantiate(this.bullet);
                bullet.position = this.getRandomPosition();
                bullet.active = true;
                bullet.zIndex = 1;
                scene.addChild(bullet);
    },
      getRandomPosition: function() {
        return cc.p(cc.random0To1()  *640, 900);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

