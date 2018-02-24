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
        var bezier = [cc.p(0,504), cc.p(-300, -504), cc.p(0, 1000)];
     var bezierForward = cc.bezierBy(3, bezier);
     this.node.runAction(bezierForward)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
