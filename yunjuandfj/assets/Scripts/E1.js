 cc.Class({
    extends: cc.Component,

    properties: {
      speed: cc.v2(0, 0),
      life:1,
    
    },
    // use this for initialization
    onLoad: function () {
    this.speed.x = getRandomInt(-100,100)
    this.speed.y = getRandomInt(100,200)
    this.i =0
    },
  onCollisionEnter: function (other, self) {
       
        this.life -= 1
        if(this.life === 0){
        this.bomb()
        }
    },
    bomb:function(){
        
    var anim = this.getComponent(cc.Animation);
     anim.play();
     anim.on('stop', this.onStop, this);
    },
   onStop:function(){
       Global.qscroe += 1
       this.node.destroy()
   },
    update: function (dt) {
        this.i +=dt
      this.node.x += this.speed.x*dt
      this.node.y -= this.speed.y*dt
         //分数不同 速度不同
        var scores = Global.qscroe
        if(this.i<=20){
            this.node.y -= this.speed.y*dt
        }
        else if(this.i>=20&&this.i<=40){
            this.node.y -= this.speed.y*dt + 2;
        }
        else if(this.i>=40&&this.i<=60){
            this.node.y -= this.speed.y*dt+ 4;
        }
      if(this.node.x <0){
          this.node.x = 640
      }
       if(this.node.x > 640){
          this.node.x = 0
      }
      if(this.node.y < -1000)
      {
          this.node.destroy()
      }
    },
});
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 }
