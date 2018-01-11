function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
    },

    // use this for initialization
    onLoad: function () {
        this.speed.x = getRandomInt(100,200)
    },
    onCollisionEnter: function (other, self) {
        this.speed.x = 0;
        var anim = this.getComponent(cc.Animation);
        anim.play();
        anim.on('stop', this.onStop, this);

    },
    onStop:function(){
        this.node.active=false
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x -= this.speed.x*dt;
        if(this.node.x < -1000||this.node.y < -504){
            this.node.destroy();
        }

    },
});
