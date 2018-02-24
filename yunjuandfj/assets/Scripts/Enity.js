var Enity = cc.Class({
    extends: cc.Component,

    properties: {
      speed: cc.v2(0, 0),
      life:0,
       jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },
    // use this for initialization
    onLoad: function () {
    this.speed.x = getRandomInt(-100,100)
    this.speed.y = getRandomInt(100,200)
     var node = cc.find('Button')
    node.on('bomb', this.bomb, this)
    },
  onCollisionEnter: function (other, self) {
       
        this.life -= 1
        if(this.life === 0){
     this.bomb()}
     
    },
    bomb:function(){
    cc.audioEngine.play(this.jumpAudio);
    var anim = this.getComponent(cc.Animation);
     anim.play();
     anim.on('stop', this.onStop, this);
    },
   onStop:function(){
       Global.qscroe += 1
       this.node.destroy()
   },
    update: function (dt) {
         
      this.node.x += this.speed.x*dt
      this.node.y -= this.speed.y*dt
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
