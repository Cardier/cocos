/**
 * @Author: 丁家豪
 * @Date:   2017-09-06T21:54:17+08:00
 * @Email:  13605179478@163.com
 * @Last modified by:   丁家豪
 * @Last modified time: 2017-09-07T16:31:17+08:00
 */

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        //this.move();
        this.schedule(this.move, 1);
        this.zhi();
    },

    update: function (dt) {

    },
    move: function () {
        var distanceL = this.node.getPositionX();
        console.log(distanceL);
        var scoreLength = cc.find('enen_04/Score').getComponent(cc.Label).string;
        var distance = 3.2 * scoreLength;
        if (distance >= 455) {
            distance = 455;
            var a = 150;
            location.replace(''+this.url+"?score="+a+"&rank="+this.i+"&level="+this.level);
            cc.game.pause();
        }
        this.node.setPositionX(distance);
    },
    zhi:function(){
       var Request ={};
       Request = GetRequest();
       var a;
       a = Request["rank"];
       var b;
       b="_aa"+a+"bb-";
       this.i= hex_md5(b);
       this.url = Request["url"];
       this.level = Request["level"];
       this.music = Request["music"];
   }

});
function GetRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
