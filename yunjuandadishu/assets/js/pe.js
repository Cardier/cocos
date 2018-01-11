var Helpers = require('Helpers');
cc.Class({
    extends: cc.Component,
    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        spawnInterval: 0
    },
    
    addSpawn: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node;
        monster.position = cc.p(5,-15)
    },
    // use this for initialization
    onLoad: function () {
        var self = this;
        self.schedule(self.addSpawn, self.spawnInterval);
    },


});