cc.Class({
    extends: cc.Component,

    properties: {
        //减分
        cutScore:{
            type:cc.Prefab,
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    //预制减分图片出现
    cutOne:function(){
        var newAdd=cc.instantiate(this.cutScore);
        this.node.addChild(newAdd,100);
        //newAdd.setPosition(0,200);
    },
    onCollisionStay: function (other, self) {
        this.cutOne();
        this.node.destroy();
    },
    onCollisionExit: function (other, self) {

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
