var Helpers = require('Helpers');
 var Enity2 =cc.Class({
    extends: cc.Component,
    properties: {
         prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        life:0
    },

    addSpawn: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node.parent;
        monster.position = cc.p(this.node.x,this.node.y - this.node.height / 2);
    },

    // use this for initialization
    onLoad: function () {
       
        this.addSpawn();
        this.schedule(this.addSpawn, 1);
    },

    onCollisionEnter: function (other, self) {
          if (other.node.group === 'buttets') {
             this.bomb()
               return
            }
        this.life -= 1
        if(this.life === 0){
     this.bomb()}
    },
    bomb:function(){
    var anim = this.getComponent(cc.Animation);
     anim.play();
     anim.on('stop', this.onStop, this);
    },
   onStop:function(){
        Global.qscroe += 5
       this.node.destroy()
   },
 
    update: function (dt) {
          this.node.y -= 100*dt
    //      if(this.node.y < -1000)
    //   {
    //       this.node.destroy()
    //   }
        
    },
});


