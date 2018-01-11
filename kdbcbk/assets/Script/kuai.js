cc.Class({
    extends: cc.Component,

    properties: {
       textures: {
           default: [],
           type: cc.SpriteFrame
       },
       audio:{
          url:cc.AudioClip,
          default:null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.zhi();
        this.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            // console.log("touch start");
            if (this.cb && this.type !== 1){
                this.cb(this.node);
                // this.gainScore();
                cc.audioEngine.play(this.audio,false,2);
            }
            else{
                var a = cc.find('Canvas/score').getComponent(cc.Label).string;
                location.replace(''+this.url+"?score="+a+"&rank="+this.i);
                cc.game.pause()
            }
        });
    },

    initWithData: function(type, cb){
        this.type = type;
        this.node.addComponent(cc.Sprite).spriteFrame = this.textures[type - 1];
        this.cb = cb;
    },

    // gainScore:function(){
    //     this.score= parseInt(cc.find('Canvas/score').getComponent(cc.Label).string);
    //     this.score++;
    //     cc.find('Canvas/score').getComponent(cc.Label).string = this.score;
    // },

     zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b="_aa"+a+"bb-";
        this.i= hex_md5(b);
        this.url = Request["url"];
        this.music = Request["music"];
    }

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
