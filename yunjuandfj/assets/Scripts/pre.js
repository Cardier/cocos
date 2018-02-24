var Helpers = require('Helpers');
cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        prefab: {
            default: [],
            type: [cc.Prefab]
        },
        boss:cc.Prefab,
        
    },
    
    addSpawn: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node;
        monster.position = this.getRandomPosition();
    },
    addSpawn1: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefab.length);
        var monster = cc.instantiate(this.prefab[randomIdx]);
        monster.parent = this.node;
        monster.position = this.getRandomPosition();
    },
     addSpawnboss: function () {
        var monster = cc.instantiate(this.boss);
        monster.parent = this.node;
        monster.position = this.getRandomPosition();
        
    },
    

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.schedule(self.addSpawn, 0.3);
        self.schedule(self.addSpawn1, 5);
         self.schedule(self.addSpawnboss, 40);
        
    },

    getRandomPosition: function() {
        return cc.p(Math.random()*640, 600);
    },

});
