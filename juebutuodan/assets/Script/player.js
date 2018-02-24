window.qscroe=0;
var Player = cc.Class({
    extends: cc.Component,
    properties: {
        Canvas:cc.Node,
        time2:cc.Label,
        audio:{
            url:cc.AudioClip,
            default:null,
        },
    },
    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this.time1 = 0
        this.zhi()
        this.end=false
        this.touchx = 0;
        this.touchy = 0;
        this.state=true;
        this.AddTouchEvent();
        this.schedule(this.djs,1)
        this.allTime=30
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
        this.music=Request["music"]
    },
    onStop:function(){
        if(!this.end){
            var a =window.qscroe.toString()
            location.replace(this.url+"?score="+a+"&rank="+this.i);
            this.node.active =false
            this.end = true
        }
    },
    djs:function(){
        this.time1 ++;
        this.time2.string =this.allTime - this.time1.toString();
        if(this.time1>this.allTime-1){
            this.onStop()
        }
    },
    onDisabled: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    AddTouchEvent:function () {
        var self=this;
        var touchStart = function (event) {
            if(this.state){
                if(this.music==null||this.music==undefined){
                    cc.audioEngine.play(this.audio,true,3);
                }else{
                    cc.audioEngine.play(this.music,true,3);
                }
                // cc.audioEngine.play(self.audio,true,1);
                // console.log(self.audio);
                this.state=false;
            }
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
        // console.log("enter");
         this.onStop();
    },
    update:function(dt){
        let scores=cc.find('Canvas/score/score').getComponent(cc.Label);
        scores.string=window.qscroe.toString();
    }
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
