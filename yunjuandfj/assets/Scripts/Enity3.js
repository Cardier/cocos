 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 }
var Helpers = require('Helpers');
 var Enity2 =cc.Class({
    extends: cc.Component,
    properties: {
         prefabs: {
            default: [],
            type: [cc.Prefab]
            
        },
         speed: cc.v2(0, 0),
    },

    addSpawn: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node.parent;
        monster.position = cc.p(this.node.x,this.node.y - this.node.height / 2);
        //monster.position = cc.p(this.node.x,this.node.y)
    },
    
    addbomn:function(){
        
    },
    // use this for initialization
    onLoad: function () {
        this.addSpawn();
        this.schedule(this.addSpawn, 1);
          this.life = 50;
         this.speed.x = getRandomInt(100,200)
         this.speed.y = getRandomInt(100,200)
    },

    onCollisionEnter: function (other, self) {
        this.life -= 1
        if(this.life === 0){
        var anim = this.getComponent(cc.Animation);
        anim.play('enemy3');
        anim.on('stop', this.onStop, this);}
    },
   onStop:function(){
       this.node.destroy()
   },
 
    update: function (dt) {
  
      if(this.node.x < 80){
          //this.node.x = 560
          this.speed.x = -this.speed.x
      }
       if(this.node.x > 560){
          //this.node.x = 80
           this.speed.x = -this.speed.x
      }
      if(this.node.y < 125)
      {//this.node.y = 883
       this.speed.y = -this.speed.y
      }
      if(this.node.y > 883){
         // this.node.y = 125
         this.speed.y = -this.speed.y
      }
      this.node.x += this.speed.x*dt
      this.node.y -= this.speed.y*dt  
   
    },
});
