cc.Class({
    extends: cc.Component,

    properties: {
        canvas:cc.Node
        // foo: {
        //    default: null,
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
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    onStartBtClick(){
        var action = cc.sequence(cc.fadeOut(1),cc.callFunc(
            function () {
                cc.director.loadScene("GameScene");
            }
        ));
        this.canvas.runAction(action);
    },
});
