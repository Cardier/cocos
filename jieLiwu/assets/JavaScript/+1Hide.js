cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.schedule(function(){
            this.node.removeFromParent();
        },0.3);
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
