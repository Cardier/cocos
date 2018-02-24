var Player = cc.Class({
    extends: cc.Component,

    properties: {
     sprites:[cc.Sprite],
     s:cc.Sprite,
     time:0.2,
     bulletPre:cc.Prefab,
     bulletPre1:cc.Prefab,
     bulletPre2:cc.Prefab,
     bulletPre3:cc.Prefab,
     Canvas:cc.Node,
     time2:cc.Label,
   
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        this.time1 = 0
        this.zhi()
        this.end=false
        this.touchx = 0;
        this.touchy = 0;
        this.AddTouchEvent();
        this.schedule(this.GenerateBullets,this.time)
    
        
        
    },
  
     zhi:function(){
        var Request = new Object();
        Request = GetRequest();
        var a
        a = Request["rank"];
        var b
        b="_aa"+a+"bb-";
        this.i= hex_md5(b)
        
    },
    bomb:function(){
        
    var anim = this.getComponent(cc.Animation);
     anim.play();
     anim.on('stop', this.onStop, this);
    },
   onStop:function(){
      if(!this.end){
          var a =Global.qscroe.toString()
          location.replace("http://www.yuncoupons.com/openplat/Topics/Game/game?score="+a+"&rank="+this.i);
          this.node.active =false
          this.end = true
      }
   },
     djs:function(){
          this.time1 ++;
          this.time2.string =60 - this.time1.toString();
          if(this.time1>59){
              this.onStop()
          }
      },

    onDisabled: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    GenerateBullets:function () {
         var m_bullet = cc.instantiate(this.bulletPre);
            m_bullet.position = this.node.position
            m_bullet.parent = this.Canvas;
    },
     GenerateBullet1s:function () {
         var m_bullet = cc.instantiate(this.bulletPre1);
            m_bullet.position = cc.p(this.node.x - 50,this.node.y)
            m_bullet.parent = this.Canvas;
    },
    GenerateBullet2s:function () {
         var m_bullet = cc.instantiate(this.bulletPre2);
            m_bullet.position = cc.p(this.node.x - 50,this.node.y)
            m_bullet.parent = this.Canvas;
    },
    GenerateBullet3s:function () {
         var m_bullet = cc.instantiate(this.bulletPre3);
            m_bullet.position = cc.p(this.node.x - 50,this.node.y)
            m_bullet.parent = this.Canvas;
    },

    AddTouchEvent:function () {
        var touchStart = function (event) {
           this.touchx = event.touch.getLocationX();
           this.touchy = event.touch.getLocationY();
        }
        var touchMove = function (event) {
            this.node.setPositionX(this.node.getPositionX() + event.touch.getLocationX() - this.touchx);
            this.node.setPositionY(this.node.getPositionY() + event.touch.getLocationY() - this.touchy);
            this.touchx = event.touch.getLocationX();
            this.touchy = event.touch.getLocationY();
        }
        var touchEnd = function (event) {
            
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
    },
     onCollisionEnter: function (other, self) {
         
    if (other.node.group === '1') {
               this.node.getComponent(cc.Sprite).spriteFrame=this.sprites[0].spriteFrame;
               this.unscheduleAllCallbacks();
               this.schedule(this.GenerateBullet1s,this.time)
              return
            }
            else if (other.node.group === '2') {
               this.node.getComponent(cc.Sprite).spriteFrame=this.sprites[1].spriteFrame;
               this.unscheduleAllCallbacks();
               this.schedule(this.GenerateBullet2s,0.2)
              return
            }
            else if (other.node.group === '3') {
               this.node.getComponent(cc.Sprite).spriteFrame=this.sprites[2].spriteFrame;
               this.unscheduleAllCallbacks();
               this.schedule(this.GenerateBullet3s,0.2)
              return
            }
            else{
                this.bomb()
            }
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
