
window.score=0;
cc.Class({
    extends: cc.Component,

    properties: {
        addScore:-1,
        change:1,
        //气球点爆音效
        audio:{
            url:cc.AudioClip,
            default:null
        }
    },
    onLoad: function () {
        //score=0;
        this.AddTouchEvent();
    },
    //音效播放
    play:function(){
        this.current = cc.audioEngine.play(this.audio, false, 3); 
    },
    //动画播放
    // animPlay:function(){
    //     var anim = this.getComponent(cc.Animation);
    //     anim.play();
    //     anim.on('stop',this.onStop,this);
    // },
    onStop:function(){
        this.node.destroy();
    },
    unactive:function(){
        this.active=false;
    },
    //音效暂停
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    //添加触摸事件
    AddTouchEvent:function () {
        var touchStart = function (event) {
            let santa=cc.find('Canvas/santa');
            console.log(window.flag);
            console.log(santa.y);
            if(santa.y<=-365&&santa.y>=-375){
                window.flag=false;
            }
            this.play();
        };
        var touchMove = function (event) {
        };
        var touchEnd = function (event) {
            if(window.flag){
                var glove=cc.find('Canvas/glove');
                var gloveX=glove.getPositionX();
                var gloveY=glove.getPositionY();
                var node=this.node;
                node.stopAllActions();
                //移动到某位置
                var moveTo=cc.moveTo(0.5,cc.p(gloveX,gloveY+100));
                //结束的回调
                var finish=cc.callFunc(this.unactive,node);
                //执行系列动作
                var myAction=cc.sequence(moveTo,finish);
                node.runAction(myAction);
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
                cc.find('Canvas/score/label').getComponent(cc.Label).string = window.score+"分";
            }else{
                return ;
            }
        };
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
    },
});
