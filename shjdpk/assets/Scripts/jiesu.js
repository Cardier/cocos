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
     this.node.zIndex = 1;
    },
    turn:function(){
        location.replace("http://game.guangjixinxi.com/dzdemo/tzwdmt1/Mobile/Game/result?score="+Global.qscroe);
        //cc.log(Global.qscroe)
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
