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
        monster.position = cc.p(0,0)
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.addSpawn()
        self.schedule(self.addSpawn, self.spawnInterval);
    },
});
