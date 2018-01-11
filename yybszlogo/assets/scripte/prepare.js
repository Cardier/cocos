cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }
        cc.director.preloadScene('Game')
    },
    turn:function(){
        cc.director.loadScene('Game');
    }
});
