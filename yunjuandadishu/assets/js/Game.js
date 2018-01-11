window.Global = {
    qscroe:0,
    one:null,
    five:null,
    hammer:null,
    time:0
};
cc.Class({
    extends: cc.Component,

    properties: {
        time:cc.Label,
        score:cc.Label,
        one:cc.Node,
        five:cc.Node,
        hammer:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
        cc.renderer.enableDirtyRegion(false);
        }
        this.end = false;
        this.zhi()
        Global.one = this.one;
        Global.five = this.five;
        Global.hammer = this.hammer;
        Global.qscroe = 0;
        this.score.string = Global.qscroe.toString();
        this.schedule(this.djs, 1,29,4);
       
      //this.touch()
    },
    zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b="_aa"+a+"bb-";
        this.url =Request["url"];
        this.i= hex_md5(b);
        this.music = Request["music"];
    },
    chick:function(){
        if(!this.end){
            location.replace(this.url+"?score="+this.score+"&rank="+this.i);
            this.end =true
        }
    },
    djs:function(){
        Global.time ++;
        this.time.string = 30 - Global.time.toString();
        if(Global.time > 29&&!this.end){
          var a =Global.qscroe.toString()
          location.replace(this.url+"?score="+a+"&rank="+this.i);
          this.end =true;
          cc.game.pause();
        }
    },
    // touch:function(){
    //     var touchStart = function (event) {
    //         this.touchx = event.touch.getLocationX();
    //         this.touchy = event.touch.getLocationY();
    //         // if(Global.qscroe < 0){
    //         //     Global.qscroe =0
    //         // }

    //         //  Global.one.position = cc.p(this.touchx,this.touchy + 75);
    //         //   Global.five.position = cc.p(this.touchx,this.touchy + 75)
    //     };

    //     var touchEnd = function (event) {
           
    //     // Global.five.active = false
    //     // Global.one.active = false
    //     };
    //     this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
       
    //     this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this); 
      
    // },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      this.score.string = Global.qscroe.toString()
    }
});
function GetRequest() {
    var url = window.location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
