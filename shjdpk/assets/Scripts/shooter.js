cc.Class({
    extends: cc.Component,

    properties: {
     
        bullet: {
            default: null,
            type: cc.Node
        },
          hj: {
            default: null,
            type: cc.Node
        },
        die:{
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
         //var scene = cc.director.getScene();
       // cc.director.getCollisionManager().enabledDebugDraw = true;
         this.schedule(this.add,3)
         this.schedule(this.addhj,5)
         this.schedule(this.adddie,10)    
    },
    add:function(){
          var scene = cc.director.getScene();
                var bullet = cc.instantiate(this.bullet);
                bullet.position = this.getRandomPosition();
                bullet.active = true;
                bullet.zIndex = 0;
                scene.addChild(bullet);
    },
    addhj:function(){
        var scene1 = cc.director.getScene();
        var hj = cc.instantiate(this.hj);
        hj.position = this.getRandomPosition();
        hj.active = true;
        hj.zIndex = 0;
        scene1.addChild(hj)
    },
    adddie:function(){
        var scene2 = cc.director.getScene();
        var die = cc.instantiate(this.die);
        die.position = this.getRandomPosition();
        die.active = true;
        die.zIndex = 0
        scene2.addChild(die)
    },
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    getRandomPosition: function() {
        return cc.p(Math.floor(Math.random() * 100) + 600,  Math.floor(Math.random() * 100) + 500);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
