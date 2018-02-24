cc.Class({
    extends: cc.Component,

    properties: {
        speed : 2,
    },
    // use this for initialization
    onLoad: function () {
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
       this.node.setPositionY(this.node.getPositionY() - this.speed);
       if (this.node.getPositionY() <= -this.node.getContentSize().height) {
            this.node.setPositionY(this.node.getPositionY()+this.node.getContentSize().height*2);
       }
    },

});
