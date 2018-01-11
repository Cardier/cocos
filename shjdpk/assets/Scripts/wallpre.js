cc.Class({
    extends: cc.Component,

    properties: {
        n:0
    },

    // use this for initialization
    onLoad: function () {
        var self =this
      cc.loader.loadRes("xx", function (err, prefab) {
        for(var i = 0;i<self.n;i++){
        var monster = cc.instantiate(prefab);
        monster.parent = self.node;
        monster.position = cc.p(20 + 60*i,5)
        }
        });

        //cc.loader.loadRes("z6", function (err, prefab) {
        //    for(var i = 0;i<self.n;i++){
        //        var monster = cc.instantiate(prefab);
        //        monster.parent = self.node;
        //        monster.position = cc.p(20 + 10*i,15)
        //    }
        //});
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
     
    },
});

