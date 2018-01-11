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
        console.log(randomIdx);
        if(randomIdx==1){
          this.node.scaleY=2.2;
        }
        sprite.spriteFrame = this.spriteList[randomIdx];
        this.get =cc.find('+1')
        //this.get =cc.find('+2')
    },
    onCollisionEnter: function (other, self) {
        this.node.active = false
    
    },
    onCollisionExit: function (other) {
      
    },


});
