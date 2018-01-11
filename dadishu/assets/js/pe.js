var Helpers = require('Helpers');
cc.Class({
    extends: cc.Component,
    properties: {
        prefabs: {
            default: [],
            type: [cc.Prefab]
        },
        spawnInterval: 0
    },
    addSpawn: function () {
        var randomIdx = Helpers.getRandomInt(0, this.prefabs.length);
        var monster = cc.instantiate(this.prefabs[randomIdx]);
        monster.parent = this.node;
        monster.position = cc.p(0,-20);
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.schedule(self.addSpawn, self.spawnInterval);
    },
   zhi:function(){
        var Request ={};
        Request = GetRequest();
        this.path =Request["imgPath"];
    },
});
 function GetRequest() {
    var imgUrl = window.location.search;
    var theRequest = new Object();
    if (imgUrl.indexOf("?") != -1) {
        var str = imgUrl.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}