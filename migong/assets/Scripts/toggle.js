cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // use this for initialization
    onLoad: function () {
        this.toggle();
    },
    toggle:function(){
        if(Math.random()<0.1){
            this.node.active=false;
        }
    }
});
