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
     var action =cc.moveBy(1,cc.p(0,25))
     var f1 =cc.fadeTo(1,0)
     var spawn = cc.spawn(action,f1);
     var finished = cc.callFunc(function () {
        this.node.destroy()
    }, this);
    var seq = cc.sequence(spawn,finished);
     this.node.runAction(seq)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
