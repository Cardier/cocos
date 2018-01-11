window.score=0;
window.flag=true;
cc.Class({
    extends: cc.Component,

    properties: {
        //时间
        time:{
            type:cc.Label,
            default:null
        },
        //得分
        score:{
            type:cc.Label,
            default:null
        },
        //加分
        addScore:{
            type:cc.Prefab,
            default:null
        },
        //减分
        cutScore:{
            type:cc.Prefab,
            default:null
        },
        //气泡logo组
        bubble:{
            type:[cc.Prefab],
            default:[]
        },
        //空气泡组
        // bubbleVoid:{
        //     type:[cc.Prefab],
        //     default:[]
        // },
        //限制框
        blockB:{
            type:cc.Node,
            default:null
        },
        //背景音乐
        audio:{
            url:cc.AudioClip,
            default:null
        }
    },

    onLoad: function () {
        this.zhi();
        this.current = cc.audioEngine.play(""+this.music, true, 4);
        this.end =false;
        //产生新空汽泡的定时器
        // this.schedule(function(){
        //     this.newBubbleVoid();
        // },0.3);
        //产生新logo汽泡的定时器
        this.schedule(function(){
            this.newBubble();
        },0.2);
        //游戏时间计时
        var time=60;
        var that=this;
        this.schedule(function Time(){
            time--;
            this.time.string=time+"秒";
            if(time===0){
                this.unschedule(Time);
                location.replace(''+this.url+"?score="+score+"&rank="+this.i);
                this.end =true;
                cc.game.pause();
            }
            if(window.flag===false){
                this.unschedule(Time);
                location.replace(''+this.url+"?score="+score+"&rank="+this.i);
                this.end =true;
                cc.game.pause();
            }
        },1);
        this.schedule(function(){
            this.santaIn();
        },6);
    },

     update: function (dt) {

     },
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    santaIn:function(){
        let santa=cc.find('Canvas/santa');
        //移动到某位置
        let moveTo=cc.moveTo(1,cc.p(santa.x,-370));
        //结束的回调
        let finish=cc.callFunc(this.santaLeave,santa);
        //执行系列动作
        let myAction=cc.sequence(moveTo,finish);
        santa.runAction(myAction);
    },
    santaLeave:function(){
        setTimeout(function(){
            let santa=cc.find('Canvas/santa');
            //移动到某位置
            let moveTo=cc.moveTo(1,cc.p(santa.x,-530));
            //结束的回调
            let finish=cc.callFunc(function(){return false;},santa);
            //执行系列动作
            let myAction=cc.sequence(moveTo,finish);
            santa.runAction(myAction);
        },1000)
    },
    newBubble:function(){
        //随机获取气泡数组的气泡
        var n=Math.floor(Math.random()*this.bubble.length);
        var newB=cc.instantiate(this.bubble[n]);
        //将新气泡添加至气泡节点上
        this.blockB.addChild(newB,100);
        //设定位置
        newB.setPosition(this.getNewBubble());
        //移动到某位置
        var moveTo=cc.moveTo(cc.random0To1()*5+1,cc.p(newB.getPositionX(),this.blockB.height/2-10));
        //结束的回调
        var finish=cc.callFunc(newB.removeFromParent,newB);
        //执行系列动作
        var myAction=cc.sequence(moveTo,finish);
        newB.runAction(myAction);
    },
    getNewBubble:function(){
        //获取随机位置X,Y
        var randX=cc.random0To1()*530-265;
        var randY=-this.blockB.height/2-10;
        return cc.p(randX,randY);
    },
    // newBubbleVoid:function(){
    //     var m=Math.floor(Math.random()*this.bubbleVoid.length);
    //     var newBV=cc.instantiate(this.bubbleVoid[m]);
    //     //将新气泡添加至气泡节点上
    //     this.blockB.addChild(newBV,100);
    //     //设定位置
    //     newBV.setPosition(this.getNewBubble());
    //     //移动到某位置
    //     var moveTo=cc.moveTo(cc.random0To1()*5+1,cc.p(newBV.getPositionX(),this.blockB.height/2-10));
    //     //结束的回调
    //     var finish=cc.callFunc(newBV.removeFromParent,newBV);
    //     //执行系列动作
    //     var myAction=cc.sequence(moveTo,finish);
    //     newBV.runAction(myAction);
    // },
    ////触摸监听
    //AddTouchEvent:function(){
    //    var touchStart = function (event) {
    //        this.bubble.active=false;
    //        this.choose();
    //    };
    //    var touchMove = function (event) {
    //    };
    //    var touchEnd = function (event) {
    //    };
    //    this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
    //    this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
    //    this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
    //},
    //
    //choose:function() {
    //    if (this.group === "+1") {
    //        this.gainScore(+1);
    //        this.addOne();
    //    }
    //    if (this.group === "-1") {
    //        this.gainScore(-1);
    //        this.cutOne();
    //    }
    //},

    ////加分
    //gainScore:function(num){
    //    this.score+=num;
    //    score=this.score;
    //    this.score.string=this.score.toString() ;
    //},
    ////加一标识
    //addOne:function(){
    //    var newAdd=cc.instantiate(this.addScore);
    //    this.node.addChild(newAdd,100);
    //    newAdd.setPosition(70,60);
    //},
    ////减一标识
    //cutOne:function(){
    //    var newCut=cc.instantiate(this.cutScore);
    //    this.node.addChild(newCut,100);
    //    newCut.setPosition(70,60);
    //},


    zhi:function(){
        var Request ={};
        Request = GetRequest();
        var a;
        a = Request["rank"];
        var b;
        b="_aa"+a+"bb-";
        this.url =Request["url"];
        this.i= hex_md5(b);
        this.music = Request["music"];
    },
    chick:function(){
        if(!this.end){
            location.replace(this.url+"?score="+this.score+"&rank="+this.i);
            this.end =true
        }
    },

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