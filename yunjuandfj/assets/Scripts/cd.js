cc.Class({
    extends: cc.Component,

    properties: {
      pre:cc.Node,
      fd:cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.i =0
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    this.i += dt
    if(this.i > 20)
    {
        this.fd.active = true
    }
    if(this.i > 40)
    {
        this.pre.active = true
    }
    },
});
