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
            var act1 = cc.fadeIn(1.0);
            var act2 = cc.fadeOut(1.0);
            var seq = cc.sequence(act1, act2);
            this.node.runAction(cc.repeatForever(seq))
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
