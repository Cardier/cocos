
window.score=0;
window.startP=0;
window.endP=0;
window.d=0;
cc.Class({
    extends: cc.Component,

    properties: {
        addScore:-1,
        change:1,
        //气球点爆音效
        audio:{
            url:cc.AudioClip,
            default:null
        },
        
    },

    onLoad: function () {
        //score=0;
        this.AddTouchEvent();
    },
    //音效播放
    play:function(){
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },
    //动画播放
    // animPlay:function(){
    //     var anim = this.getComponent(cc.Animation);
    //     anim.play();
    //     anim.on('stop',this.onStop,this);
    // },
    onStop:function(){
        this.node.destroy();
        // cc.find('Canvas/arr').opacity=0;
    },
    //音效暂停
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    //添加触摸事件
    AddTouchEvent:function () {
        var touchStart = function (e) {
            this.play();
            var arr=cc.find('Canvas/arr');
            arr.setPosition(this.node.getPosition());
            arr.opacity=255;
            setTimeout(function() {
                arr.opacity=0;
            }, 100);
            // console.log("touchstart",this.node.getPositionY());
            // this.animPlay();
            // var delta = e.getDeltaX();
            // window.d += delta;
        };
        var touchMove = function (e) {
            // console.log("touchmove",this.node.getPositionY());
            // var delta = e.getDeltaX();
            // window.d += delta;
            // this.y += delta.y;
            // console.log("x:"+window.d);
            // if(this.x>2||this.y>2){
            //     alert('可以了');
            // }
        };
        
        var touchEnd = function (e) {
            // alert("end:"+e.getDeltaY());
            // console.log("touchEnd",this.node.getPositionY());
            // console.log(this.addScore);
            window.score += this.addScore;
            this.onDestroy();
            var url = '+' + this.change;
            cc.loader.loadRes(url, (err, prefab)=> {
                var newNode = cc.instantiate(prefab);
                newNode.setPosition (this.node.x+320,this.node.y+ 100+504);
                cc.director.getScene().addChild(newNode);
            });
            if (window.score < 0) {
                window.score = 0;
            }
            // cc.find('Canvas/arr').opacity=0;
            cc.find('Canvas/score/label').getComponent(cc.Label).string = window.score+"分";
            this.node.active = false;   
        };
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
    },
});
