cc.Class({
    extends: cc.Component,

    properties: {
    boss:cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
      //this.schedule(this.addl,1)
      this.schedule(this.addSpawnboss,1)
    },
     addl:function(){
         var self =this
    cc.loader.loadRes("zidana", function (err, prefab) {
    var newNode = cc.instantiate(prefab);
    newNode.position = self.node.position
    cc.director.getScene().addChild(newNode);
    });
    },
 addSpawnboss: function () {
        var monster = cc.instantiate(this.boss);
        monster.parent = this.node;
       monster.position = this.node.position
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
