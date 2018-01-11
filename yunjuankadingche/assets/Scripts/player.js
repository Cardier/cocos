cc.Class({
    extends: cc.Component,

    properties: {
      speed: cc.v2(0, 0),
      time:cc.Label,
      score:cc.Label,
      up1:cc.Node,
      down1:cc.Node,
      down2:cc.Node,
      nickname:cc.Label,
      left:cc.Node,
      right:cc.Node,
      acce:{
          default:null,
          type:cc.Node
      },
      bgMusic:{
        default: null,
        url: cc.AudioClip
     }
    },

    // use this for initialization
    onLoad: function () {
        var self=this;
        cc.director.getCollisionManager().enabled = true;
        // this.jumping =true;
        this.AddTouchEvent();
        this.time1 =0
        this.score1 = 0
        this.counter=0
        this.n=0
        // this.onTouchLeft();
        this.zhi()
        this.schedule(this.djs,1)
        cc.inputManager.setAccelerometerEnabled(false);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        // cc.audioEngine.playMusic(''+this.music,true);
        if(this.uName=='undefined'){
            this.nickname.string="Mr.nobody";
        }else{
            this.nickname.string=this.uName;
        }
        if(this.ucar=="undefined"){
            return ;
        }else{
            cc.loader.loadRes(this.ucar,  cc.SpriteFrame,(err, spriteFrame)=>{
                    this.node.getComponent(cc.Sprite).spriteFrame=spriteFrame;
            });
        }
    },
    onTouchLeft:function(){
        this.node.x +=-50; 
        if(this.node.x==20){
            this.nickname.node.x=this.node.x+40;
        }else{
            this.nickname.node.x=this.node.x;
        }
    },
    onTouchRight:function(){
        this.node.x += 50;
        if(this.node.x==610){
            this.nickname.node.x=this.node.x-40;
        }else{
            this.nickname.node.x=this.node.x;
        }
    },
    onDeviceMotionEvent (event) {
        this.speed.x = event.acc.x
    },
    onStop:function(){
        location.replace(''+this.url+"?score="+this.score1+"&rank="+this.i);
    },
      
    s(n){
        this.n=n;
        if(n>0){
            this.counter++;
            if(this.counter>5){
                this.n=10;
                this.score1+=this.n;
                this.counter=0;
            }else if(this.counter==3){
                this.n=6;
                this.score1 += this.n;
            }else{
                this.score1+=this.n;
            }
        }else{
            this.counter=0;
            this.score1+=this.n;
        }
        
        if(this.score1 < 0){
          this.score1= 0
        }
      this.score.string =this.score1.toString()+"m"; 
        var ss = ''+this.n
      cc.loader.loadRes(ss,  (err, prefab)=>{
        var monster = cc.instantiate(prefab);
        monster.parent = this.node;
        monster.position = cc.p(0,100)
        setTimeout(function(){
            monster.active=false;
        },300)
        });
    },
    djs:function(){
        cc.audioEngine.playMusic(this.bgMusic,true);
        this.time1 ++;
        this.time.string =60 - this.time1.toString()+"s";
        this.score1+=10;
        this.score.string =this.score1.toString()+"m";
        if(this.time1>=50){
            cc.find('timer').opacity=255;
            cc.find('timer').getComponent(cc.Label).string=60 - this.time1.toString()+"s"; 
        }
        if(this.time1>59){
            this.onStop()
            cc.game.pause()
        }
    },
      
    onCollisionEnter: function (other, self) {
           if (other.node.group === 'shitou') {
             this.s(-1)
              return
            }
            else if (other.node.group === 'jinbing') {
            this.s(1)
              return
            }
            else if (other.node.group === 'mutu') {
             this.s(-2)
              return
            }
            
    },
    AddTouchEvent:function () {
        var self=this;
        // console.log(self);
        var touchStart = function (event) {
        }
        var touchEnd = function (event) {
            if(this.name=="left"){
                self.onTouchLeft();
            }else{
                self.onTouchRight();
            }
        }
        var touchAcce=function(){
            
        }
        var touchEndAcce=function(){
            var node=self.node;
            var moveTo=cc.spawn(
                cc.scaleTo(1, 0.5, 0.5),
                cc.moveTo(1,cc.p(node.x,482))
            )
            var finish=cc.spawn(
                cc.scaleTo(10, 1, 1),
                cc.moveTo(10,cc.p(node.x,82))
            )
            var moveTo1=cc.spawn(
                cc.scaleTo(1, 0.5, 0.5),
                cc.moveTo(1,cc.p(node.x,565))
            )
            var finish1=cc.spawn(
                cc.scaleTo(10, 1, 1),
                cc.moveTo(10,cc.p(node.x,165))
            )
            //执行系列动作
            var myAction=cc.sequence(moveTo,finish);
            //执行系列动作
            var myAction1=cc.sequence(moveTo1,finish1);
            console.log(Math.round(node.y));
            if(Math.round(node.y)===82){
                node.runAction(myAction);
                self.nickname.node.runAction(myAction1);
            }
        }
        this.left.on(cc.Node.EventType.TOUCH_START,touchStart,this.left);
        this.left.on(cc.Node.EventType.TOUCH_END,touchEnd,this.left); 
        this.acce.on(cc.Node.EventType.TOUCH_START,touchAcce,this.acce);
        this.acce.on(cc.Node.EventType.TOUCH_END,touchEndAcce,this.acce); 
        // this.left.on(cc.Node.EventType.TOUCH_CANCEL,touchcancel,this.left); 
        this.right.on(cc.Node.EventType.TOUCH_START,touchStart,this.right);
        this.right.on(cc.Node.EventType.TOUCH_END,touchEnd,this.right); 
        // this.right.on(cc.Node.EventType.TOUCH_CANCEL,touchcancel,this.right); 
    },
    zhi:function(){
        var Request = new Object();
        Request = GetRequest();
        var a
        a = Request["rank"];
        var b
        b="_aa"+a+"bb-";
        this.i= hex_md5(b)
        this.url = Request["url"];
        this.music = Request["music"];
        this.uName=decodeURI(Request["uname"]);
        this.ucar=Request["ucar"];
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
         if(this.node.x>560){
            this.node.x=560
        }
        if(this.node.x<70){
            this.node.x =70
        }
     this.node.x += this.speed.x*15
    },
});
function GetRequest() {
    var url = window.location.search
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