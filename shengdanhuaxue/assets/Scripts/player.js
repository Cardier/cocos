cc.Class({
    extends: cc.Component,

    properties: {
      speed: cc.v2(0, 0),
      time:cc.Label,
      scroe:cc.Label,
      audio: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
    cc.director.getCollisionManager().enabled = true;
    this.zhi()
    this.jumping =false
    this.AddTouchEvent();
    this.time1 =0
    this.scroe1 = 0
    this.schedule(this.djs,1)
    console.log(this.url);
    this.current = cc.audioEngine.play(this.audio, true, 1);
    cc.inputManager.setAccelerometerEnabled(true);
    cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      cc.audioEngine.playMusic(''+this.music,true);
    },
    onDeviceMotionEvent (event) {
        this.speed.x = event.acc.x
       
    },
      onStop:function(){
          location.replace(''+this.url+"?score="+this.scroe1+"&rank="+this.i);
      },
      
    s(n){
        this.scroe1 += n
        if(this.scroe1 < 0){
          this.scroe1= 0
      }
      this.scroe.string =this.scroe1.toString() 
         var ss = ''+n
        cc.loader.loadRes(ss,  (err, prefab)=>{
        var monster = cc.instantiate(prefab);
        monster.parent = this.node;
        monster.position = cc.p(0,100)
        });
    },
     djs:function(){
          this.time1 ++;
          this.time.string =60 - this.time1.toString();
         if(this.time1>59){
              this.onStop()
              cc.game.pause()
          }
      },
      
    onCollisionEnter: function (other, self) {
           if (other.node.group === 'shitou') {
              this.s(-2)
              return
            }
            else if (other.node.group === 'jinbing') {
              this.s(2)
              return
            }
            else if (other.node.group === 'mutu') {
                this.s(-2)
              return
            }
            
    },
    AddTouchEvent:function () {
        var touchStart = function (event) {
           this.touchxstart = event.touch.getLocationX();
           this.touchystart = event.touch.getLocationY();
        }
        var touchEnd = function (event) {
            this.touchxend = event.touch.getLocationX();
           this.touchyend = event.touch.getLocationY();
           if(this.touchyend>this.touchystart){
              this.jump()
           }
        }
        var touchcancel = function (event) {
            this.touchxend = event.touch.getLocationX();
           this.touchyend = event.touch.getLocationY();
           if(this.touchyend>this.touchystart){
              this.jump()
           }
        }
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,touchcancel,this); 
    },
    zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b="_aa"+a+"bb-";
        this.i= hex_md5(b);
        this.url = Request["url"];
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
         if(this.node.x>450){
            this.node.x=450
        }
        if(this.node.x<150){
            this.node.x =150
        }
     this.node.x += this.speed.x*15
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
