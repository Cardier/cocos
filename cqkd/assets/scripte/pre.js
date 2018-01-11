var Helpers = require('Helpers');
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
 }
cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        spawnInterval: 1
    },
    
    addSpawn: function () {

        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node;
        monster.position = this.getRandomPosition();
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.size = cc.winSize;
        self.randomRange = cc.p(200, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);
    },

    getRandomPosition: function() {
        return cc.p(getRandomInt(280,340),getRandomInt(-205,-212));
    },
});
