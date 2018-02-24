cc.Class({
    extends: cc.Component,

    properties: {
        boss:cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
      this.schedule(this.addSpawnboss, 2);
    },
     addSpawnboss: function () {
        var monster = cc.instantiate(this.boss);
        monster.parent = this.node;
        monster.position = this.getRandomPosition();
        
    },
    getRandomPosition: function() {
        return cc.p((Math.random()*2-1)*320, 600);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
