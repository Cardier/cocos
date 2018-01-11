cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.action = cc.fadeOut(0.4);
        var finished = cc.callFunc(function () {
            this.node.destroy()
        }, this);
        this.node.runAction(cc.sequence( this.action, finished))
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
