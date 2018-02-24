cc.Class({
    extends: cc.Component,

    properties: {
     bomb:cc.Prefab,
   
    },

    // use this for initialization
    onLoad: function () {
      
    },
    bumb:function(){
       
      
            var newNode = cc.instantiate(this.bomb);
            this.node.addChild(newNode);
            newNode.setPosition(cc.p(0,0))
        
    },
 
    // called every frame, uncomment this function to activate update callback
 

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
