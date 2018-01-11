var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function () {
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
        if(randomIdx==5){
            this.node.group='4';
        }else{
            this.node.group='1';
        }
    },
    onCollisionEnter: function (other, self) {
        this.node.active = false
    
    },
    onCollisionExit: function (other) {
      
    },


});
