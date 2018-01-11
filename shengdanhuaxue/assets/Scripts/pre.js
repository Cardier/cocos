var Helpers = require('Helpers');
cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        
    },
    addSpawn: function (time,position) {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node;
        monster.position = cc.p(0,0)
        monster.getComponent('move').move(time,position);
    },
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

