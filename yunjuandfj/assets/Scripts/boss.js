cc.Class({
    extends: cc.Component,

    properties: {
      speed: cc.v2(0, 0),
      life:1,
    
    },
    // use this for initialization
    onLoad: function () {
    this.speed.x = getRandomInt(-100,100)
    this.speed.y = getRandomInt(0,100)
    this.schedule(this.addl,1)
    },
  addl:function(){
         var self =this
    cc.loader.loadRes("zidana", function (err, prefab) {
    var newNode = cc.instantiate(prefab);
    newNode.position = cc.p(0,0)
    //cc.director.getScene().addChild(newNode);
    self.node.addChild(newNode);
    
    });},
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
       Global.qscroe += 50
       this.node.destroy()
   },
    update: function (dt) {
         
      this.node.x += this.speed.x*dt
      this.node.y -= this.speed.y*dt
         //分数不同 速度不同
      if(this.node.x <0){
          this.node.x = 640
      }
       if(this.node.x > 640){
          this.node.x = 0
      }
      
    },
});
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 }

