cc.Class({
    extends: cc.Component,

    properties: {
        startbtn:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        cc.director.pause();
    },
    ready:function(){
        cc.director.resume();
        this.startbtn.active = false
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
