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
        var self=this;
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(self.prefabs[randomIdx]);
        monster.parent = self.node;
        monster.position = self.getRandomPosition();
        // var action=cc.moveBy(.3,cc.p(0, -50));
        // monster.runAction(action.repeatForever());
        // monster.position = this.getRandomPosition();
    },
    // use this for initialization
    onLoad: function () {
        var self = this;
        self.schedule(self.addSpawn, 1);
        // cc.director.getCollisionManager().enabled = true;
    },

    getRandomPosition: function() {
        return cc.p(Math.random()*600-300, 300);
    },
});
