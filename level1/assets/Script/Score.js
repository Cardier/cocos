cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        score:0,
    },
    
    reward:0,
    // use this for initialization
    onLoad: function () {
        this.zhi();
    },
    setReward:function(reward){
        this.reward=reward;
        
    },
    updateScore:function(){
        var com=this.node.getComponent(cc.Label);
        
        this.score+=this.reward;
        
        com.string=this.score;
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

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
        this.level = Request["level"];
        this.music = Request["music"];
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