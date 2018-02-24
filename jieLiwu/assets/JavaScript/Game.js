//const Player = require('Player');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        //掉落物
        drop: {
            type:[cc.Prefab],
            default:[]
            },
        //炸弹
        boom:{
            type:cc.Prefab,
            default:null
        },
        ////操作人物
        //player: {
        //    default: null,
        //    type: Player
        //},
        //游戏倒计时
        timeS:{
            default:null,
            type:cc.Label
        },
        //分数
        score:{
            default:null,
            type:cc.Label
        },
        //音乐
        audio: {
            url: cc.AudioClip,
            default: null
        }
    },
    // use this for initialization
    onLoad: function () {
        this.zhi();
        this.end =false;
        cc.audioEngine.play(this.audio, true, 3);
        var timerS=60;
        var flag1=true;
        var flag2=true;
        var flag3=true;
        this.schedule(function TS(){
            timerS--;
            this.timeS.string=timerS;
            if(timerS===0){
                this.unschedule(TS);
                location.replace(''+this.url+"?score="+score+"&rank="+this.i);
                this.end =true;
                cc.game.pause();
            }
            //落物下落的定时器
            var timer1=null;
            var timer2=null;
            var timer3=null;
            var timer4=null;
            var timer5=null;
            var timer6=null;
            var self=this;
            if(timerS>40){
                if(flag1){
                    flag1=false;
                    timer1=setInterval(function(){
                        self.newFruit(2,1);
                    },1000);
                    timer4=setInterval(function(){
                        self.newBoom(1.4,1);
                    },1000);
                }
            }else if(timerS<=40&&timerS>20){
                if(flag2){
                    flag2=false;
                    clearInterval(timer1);
                     clearInterval(timer4);
                    timer2=setInterval(function(){
                        self.newFruit(1.5,.4);
                    },240);   
                    timer5=setInterval(function(){
                        self.newBoom(1,1);
                    },600);
                }
            }else if(timerS<=20&&timerS>0){
                if(flag3){
                    flag3=false;
                    clearInterval(timer2);
                     clearInterval(timer5);
                    timer3=setInterval(function(){
                        self.newFruit(.6,.5);
                    },100);
                    timer6=setInterval(function(){
                        self.newBoom(.8,.5);
                    },400);
                }
            }
        },1)
    },

    //获取预制非炸弹掉落物
    newFruit(num1,num2){
        //随机获取水果数组的水果
        var n=Math.floor(Math.random()*this.drop.length);
        var newFruit=cc.instantiate(this.drop[n]);
        //将新水果添加至该节点上
        this.node.addChild(newFruit,100);
        //设定位置
        newFruit.setPosition(this.getNewStartPosition());
        //移动到某位置
        var moveTo=cc.moveTo(cc.random0To1()*num1+num2,cc.p(newFruit.getPositionX(),-this.node.height/2-100));
        //结束的回调
        var finish=cc.callFunc(newFruit.removeFromParent,newFruit);
        //执行系列动作
        var myAction=cc.sequence(moveTo,finish);
        newFruit.runAction(myAction);
    },
    //获取预制炸弹
    newBoom(num1,num2){
        var newFruit=cc.instantiate(this.boom);
        this.node.addChild(newFruit,100);
        newFruit.setPosition(this.getNewStartPosition());
        var moveTo=cc.moveTo(cc.random0To1()*num1+num2,cc.p(newFruit.getPositionX(),-this.node.height/2-50));
        var finish=cc.callFunc(newFruit.removeFromParent,newFruit);
        var myAction=cc.sequence(moveTo,finish);
        newFruit.runAction(myAction);
    },
    getNewStartPosition(){
        //获取随机位置X,Y
        var randX=cc.random0To1()*560-280;
        var randY=this.node.height/2+100;
        return cc.p(randX,randY);
    },

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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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

