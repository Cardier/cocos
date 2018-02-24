window.Global = {
  qscroe: 0
}
cc.Class({
  extends: cc.Component,

  properties: {
    u: {
      default: null,
      type: cc.Node
    },
    d: {
      default: null,
      type: cc.Node
    },
    l: {
      default: null,
      type: cc.Node
    },
    r: {
      default: null,
      type: cc.Node
    },
    speed: cc.v2(0, 0),
    time: {
      default: null,
      type: cc.Label
    },
    clickAudio:{
      url:cc.AudioClip,
      default:null
    }
  },
  // use this for initialization
  onLoad: function () {
    Global.qscroe = 0
    this.touch()
    cc.director.getCollisionManager().enabled = true
    // cc.director.getCollisionManager().enabledDebugDraw = true
    this.zhi();
    this.collisionX = 0
    this.collisionY = 0
    this.time1 = 60
    this.schedule(this.djs, 1)
    this.end = false
    this.state=true;
    // cc.inputManager.setAccelerometerEnabled(true);
    cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
  },
  zhi:function(){
    var Request = new Object();
    Request = GetRequest();
    var a
    a = Request["rank"];
    var b
    b="_aa"+a+"bb-";
    this.i= hex_md5(b)
    this.url=Request["url"]
    this.level=Request["level"]
  },
  onCollisionEnter: function (other, self) {
    if (other.node.group === 'chukuo' && !this.end) {
      this.unschedule(this.djs)
      location.replace(this.url +"?score="+Global.qscroe+"&rank="+this.i+"&level="+this.level)
      this.end = true
      cc.game.pause()
    }
    if (other.node.group === 'hua' && !this.end) {
      if(other.node.name==="dot"){
        Global.qscroe++
      }else{
        if(Global.qscroe<=0){
          Global.qscroe=0;
        }else{
          Global.qscroe--
        }
      }
      var scores = cc.find('an/score/score').getComponent(cc.Label);
      scores.string = Global.qscroe.toString()
      other.node.destroy();
      return false;
    }
    // console.log("collisionEnter");
    // console.log("X:"+other);
    // console.log("Y:"+other);
    var otherAabb = other.world.aabb
    var otherPreAabb = other.world.preAabb.clone()

    var selfAabb = self.world.aabb
    var selfPreAabb = self.world.preAabb.clone()

    selfPreAabb.x = selfAabb.x
    otherPreAabb.x = otherAabb.x
    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
        // console.log("Xmin");
        // this.node.x = otherPreAabb.xMax - parseInt(this.node.parent.x)+ selfPreAabb.width/2
        this.collisionX = -1
      }
      else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
        // this.node.x = otherPreAabb.xMin  - parseInt(this.node.parent.x)- selfPreAabb.width/2
        // console.log("Xmax");
        this.collisionX = 1
      }
      this.speed.x = 0
      other.touchingX = true
      return false;
    }

    selfPreAabb.y = selfAabb.y
    otherPreAabb.y = otherAabb.y

    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
        this.node.y = otherPreAabb.yMax - this.node.parent.y+ selfPreAabb.height/2;
        this.collisionY = -1
        // console.log("Ymin");
      }
      else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
        this.node.y = otherPreAabb.yMin - selfPreAabb.height/2 - this.node.parent.y
        this.collisionY = 1
        // console.log("Ymax");
      }
      this.speed.y = 0
      other.touchingY = false
    }
  },
  onCollisionExit: function (other) {
    if (other.touchingX) {
      this.collisionX = 0
      other.touchingX = false
    }else if(other.touchingY==undefined||other.touchingY==null){
      // console.log('return')
      return false;
    }
    else if (!other.touchingY) {
      this.collisionY = 0
      other.touchingY = true
    }
  },
  onDeviceMotionEvent:function(event){
      var self=this;
      // console.log("event.acc.x>0&&this.collisionX==0::"+event.acc.x>0&&this.collisionX==0);
      if(event.acc.x>0){
        self.speed.x = 1
        self.node.rotation = 0
        self.node.stopAllActions();
        var action = cc.flipX(false);
        // 执行动作
        self.node.runAction(action);
        var action1 = cc.flipX(false);
        // 执行动作
        self.node.runAction(action1);
      }
      if(event.acc.x<0){
        self.speed.x = -1
        self.node.rotation = 0
        self.node.stopAllActions();
        var action = cc.flipX(false);
        // 执行动作
        self.node.runAction(action);
        var action1 = cc.flipX(true);
        // 执行动作
        self.node.runAction(action1);
      }
      if(event.acc.y>0){
        // console.log("this.maxY::::"+this.maxY);
        self.speed.y = 1
        self.node.rotation = 0
        self.node.stopAllActions();
        var action = cc.flipX(false);
        // 执行动作
        self.node.runAction(action);
        self.node.rotation = -90
      }
      if(event.acc.y<0){
        self.speed.y = -1
        self.node.rotation = 0
        self.node.stopAllActions();
        var action = cc.flipX(false);
        // 执行动作
        self.node.runAction(action);
        self.node.rotation = 90
      }
  },
  touch: function () {
    var self = this
    var listener1 = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function (touch, event) {
        if(this.state){
          var audio=cc.find('Canvas').getComponent('music');
          cc.audioEngine.play(audio.jumpAudio,true,1);
          this.state=false;
        }
        cc.audioEngine.play(this.clickAudio,false,6);
        var touchLoc = touch.getLocation()
        var ub = this.u.getBoundingBox()
        var db = this.d.getBoundingBox()
        var lb = this.l.getBoundingBox()
        var rb = this.r.getBoundingBox()
        if (cc.rectContainsPoint(ub, touchLoc)) {
          this.speed.y = 1
          self.node.rotation = 0
          self.node.stopAllActions();
          var action = cc.flipX(false);
          // 执行动作
          self.node.runAction(action);
          self.node.rotation = -90
        }
        if (cc.rectContainsPoint(db, touchLoc)) {
          this.speed.y = -1
          self.node.rotation = 0
          self.node.stopAllActions();
          var action = cc.flipX(false);
          // 执行动作
          self.node.runAction(action);
          self.node.rotation = 90
        }
        if (cc.rectContainsPoint(lb, touchLoc)) {
          this.speed.x = -1
          self.node.rotation = 0
          self.node.stopAllActions();
          var action = cc.flipX(false);
          // 执行动作
          self.node.runAction(action);
          var action1 = cc.flipX(true);
          // 执行动作
          self.node.runAction(action1);
        }
        if (cc.rectContainsPoint(rb, touchLoc)) {
          this.speed.x = 1
          self.node.rotation = 0
          self.node.stopAllActions();
          var action = cc.flipX(false);
          // 执行动作
          self.node.runAction(action);
          var action1 = cc.flipX(false);
          // 执行动作
          self.node.runAction(action1);
        }
        return true
      }.bind(self),
      onTouchEnded: function (touch, event) {
        this.speed.x = 0
        this.speed.y = 0
      }.bind(self)
    })
    cc.eventManager.addListener(listener1, this.node)
  },
  djs: function () {
    this.time1--
    this.time.string = this.time1.toString()
    if(this.time1==0&&(!this.end)){
      this.unschedule(this.djs)
      Global.qscroe=0;
      location.replace(this.url +"?score="+Global.qscroe+"&rank="+this.i+"&level="+this.level)
      this.end = true
      cc.game.pause()
    }
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (this.speed.x * this.collisionX > 0) {
      this.speed.x = 0
    }
    if (this.speed.y * this.collisionY > 0) {
      this.speed.y = 0
    }

    this.node.x += this.speed.x * 10
    this.node.y += this.speed.y * 10
  }
})
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

