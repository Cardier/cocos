cc.Class({
    extends: cc.Component,

    properties: {
        //加分
        addScores:{
            type:cc.Prefab,
            default:null
        },

    },

    // use this for initialization
    onLoad: function () {

    },

    //预制加分图片出现
    addMore:function(){
        var newAdd=cc.instantiate(this.addScore);
        this.node.addChild(newAdd,100);
        //newAdd.setPosition(0,200);
    },
    onCollisionStay: function (other, self) {
        this.addMore();
        this.node.destroy();
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
