cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
    this.zhi();
    this.end=false
    },
    zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a
        a = Request["rank"];
        var b
        b="_aa"+a+"bb-";
        this.i= hex_md5(b)
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
