
cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2000, 2000),//最大左右速度
        gravity: -1000,//重力速度
        direction: 0,//初始方向
        jumpSpeed: 400,//向上速度
        time:cc.Label,
        scoreDisplay:cc.Label,
        s1:cc.Node,
        s2:cc.Node,
        s3:cc.Node,
        t:cc.SpriteFrame,
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;//开启碰撞组件
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('run');
        this.touch();
        this.zhi();
        this.time1 =0;
        this.score =0;
        this.collisionY = 0;
        this.end = false;
        this.jumping2 = false;
        this.schedule(this.djs,1);
    },
       gainScore: function () 
      {
        this.score += 1;
        this.scoreDisplay.string =   this.score.toString();
      },
    djs:function(){
          this.time1 ++;
          this.time.string = 60-this.time1.toString();
         if(this.time1>59){
            this.gameover()
         }
      },
    touch:function(){
        var self = this;
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:self.ot.bind(self)},
            self.node) 
    },
    onDisabled: function () {
        cc.director.getCollisionManager().enabled = false;//关闭碰撞组件
        cc.director.getCollisionManager().enabledDebugDraw = false;//关闭碰撞组件框框
    },
  
     gameover:function(){
         var a =this.score.toString();
            location.replace(''+this.url+"?score="+a+"&rank="+this.i);
            this.node.active = false;
         cc.game.pause()
    },
    ot:function(){
        cc.audioEngine.playMusic(this.jumpAudio);
     if (!this.jumping2){
        this.speed.y = 600; 
        this.anim.stop('run');
        this.anim.playAdditive('jumpRabbit');
        // this.node.addComponent(cc.Sprite).spriteFrame = this.t
        if(this.jumping ){
            this.jumping2 = true;
            this.jumping = false;
            this.speed.y = 700; 
        }else{
            this.jumping = true
        }
    }
    },


    //碰撞开始
    onCollisionEnter: function (other, self) {
         var a =self.node.position;
         if (other.node.group === '1')
         {
             this.s1.active =true;
             this.s1.position = cc.p((a.x + 50),(a.y + 230));
             this.gainScore();
             return;
         }
        if (other.node.group === '2') {
            this.s2.active = true;
            this.s2.position = cc.p((a.x + 50), (a.y + 200));
            this.gainScore();
            this.gainScore();
            return;
        }
        if(other.node.group === '3'){
            this.s3.active =true;
            this.s3.position = cc.p((a.x + 50),(a.y + 200));
            this.gainScore();
            this.gainScore();
            this.gainScore();
            return;
        }
         this.anim.playAdditive('run');
         //
         this.anim.stop('jumpRabbit');
        var otherAabb = other.world.aabb;//得到另一个的框框（rect）
        var otherPreAabb = other.world.preAabb.clone();//上一次计算的碰撞组件另一个的 aabb 碰撞框
        var selfAabb = self.world.aabb;//得到自己的框框
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax> otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.jumping = false;
                 this.jumping2 = false;
                this.collisionY = -1;
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMax)) {
                   this.node.y = otherAabb.yMin - selfAabb.height;
                this.collisionY = 0;
            }
            this.speed.y = 0;
            other.touchingY = true;
        }  
        this.s1.active =false;
        this.s2.active =false;
        this.s3.active =false;
    },
    
    onCollisionExit: function (other) {
        if (other.node.group === '1')
         {
             this.s1.active =false;
             return;
         }
         if(other.node.group === '2'){
             this.s2.active =false;
             return;
         }
        if(other.node.group === '3'){
            this.s3.active =false;
            return;
        }
      if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }

    },
    djs:function(){
        this.time1++;
        this.time.string =60 -this.time1.toString();
        if(this.time1>59&!this.end){
            location.replace(''+this.url+"?score="+this.score+"&rank="+this.i);
            this.end =true;
            cc.game.pause()

        }
    },
    update: function (dt) {
        if (this.collisionY === 0) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }
        this.node.y += this.speed.y * dt;
        if(this.node.y<-600){
            this.gameover();
        }
    },
    zhi: function () {
        var Request = {};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b = "_aa" + a + "bb-";
        this.url = Request["url"];
        this.i = hex_md5(b)
    },

});


function GetRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

