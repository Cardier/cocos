var Helpers = require('Helpers');
cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
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
        self.schedule(self.addSpawn, 3);
    },

    getRandomPosition: function() {
        return cc.p(0,Math.random()*200);
    },

    
});