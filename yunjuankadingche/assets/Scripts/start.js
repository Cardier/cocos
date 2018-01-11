cc.Class({
    extends: cc.Component,

    properties: {
     bu:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.pause()
    },
    ll:function(){
        cc.director.resume()
        this.bu.active = false
        cc.find('line').opacity=0;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
