window.score=0;

cc.Class({
    extends: cc.Component,

    properties: {
        ////加速度
        //accel:0,
        ////最大移动速度
        //MaxMoveSpeed:0,

        scoreDisplay:cc.Label,
        //加分
        addScore:{
            type:[cc.Prefab],
            default:[]
        },
        //减分
        cutScore:{
            type:cc.Prefab,
            default:null
        },
        audioRed: {
            url: cc.AudioClip,
            default: null
        },
        audioBone: {
            url: cc.AudioClip,
            default: null
        },
        audioBoom: {
            url: cc.AudioClip,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.score =0;
        ////加速度方向开关
        //this.accLeft=false;
        //this.accRight=false;
        ////当前水平方向速度
        //this.xSpeed=0;
        ////屏幕边界
        //this.minPosX=-this.node.parent.width/2;
        //this.maxPosX=this.node.parent.width/2;
        //初始化键盘、触摸输入监听
        //this.setInputControl();
        this.AddTouchEvent();
        //碰撞系统
        cc.director.getCollisionManager().enabled=true;
    },

    AddTouchEvent:function(){
        var touchStart = function (event) {
            this.touchx=event.touch.getLocationX();
            var animCtrl = cc.find('Canvas/player/head').getComponent(cc.Animation);
            animCtrl.play();
        };
        var touchMove = function (event) {
           this.node.setPositionX(this.node.getPositionX()+event.touch.getLocationX()-this.touchx);
            this.touchx=event.touch.getLocationX();
        };
        var touchEnd = function (event) {
            var animCtrl = cc.find('Canvas/player/head').getComponent(cc.Animation);
            animCtrl.stop();
        };
        this.node.on(cc.Node.EventType.TOUCH_START,touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
    },

    gainScore:function(num){
        this.score+=num;
        if(this.score<0){
            this.score=0;
        }
        score=this.score;
        this.scoreDisplay.string=this.score.toString();
    },

    //预制加分图片出现
    addOne:function(num){
        var newAdd=cc.instantiate(this.addScore[num]);
        this.node.addChild(newAdd,100);
        //newAdd.setPosition(0,200);
    },
    //预制减分图片出现
    cutOne:function(){
        var newAdd=cc.instantiate(this.cutScore);
        this.node.addChild(newAdd,100);
        //newAdd.setPosition(0,200);
    },


    onCollisionEnter:function(other,self){
        if(other.node.group==="+2"){
            this.gainScore(+50);
            this.addOne(0);
            cc.audioEngine.play(this.audioRed,false,5);
            //return;
        }
        if(other.node.group==="+3"){
            this.gainScore(+100);
            this.addOne(1);
            cc.audioEngine.play(this.audioBone,false,5);
            let head = cc.find('Canvas/player/head');
            let actionTo=cc.scaleTo(.3,1.1,1.1);
            //结束的回调
            let finish=cc.callFunc(function(){
                let actionTo2=cc.scaleTo(.1,1,1);
                let myAction2=cc.sequence(actionTo2);
                head.runAction(myAction2);
            },head);
            //执行系列动作
            let myAction=cc.sequence(actionTo,finish);
            head.runAction(myAction);
        }
        if(other.node.group==="-1"){
            this.gainScore(-50);
            this.cutOne();
            cc.audioEngine.play(this.audioBoom,false,5);
            let bg = cc.find('Canvas/background').getComponent(cc.Animation);
            bg.play();
        }

    },




    update:function(dt) {
            ////根据当前方向加速度更新每帧速度
            //if(this.accLeft){
            //    this.xSpeed -=this.accel*dt;
            //}else if(this.accRight){
            //    this.xSpeed +=this.accel*dt;
            //}
            ////限制主角速度不能大于最大速度
            //if (Math.abs(this.xSpeed) > this.MaxMoveSpeed) {
            //    this.xSpeed=this.MaxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed);
            //}
            ////更新主角位置
            //this.node.x+=this.xSpeed*dt;
            //限制活动范围
            if(this.node.x>this.node.parent.width/2-80){
                this.node.x=this.node.parent.width/2-80;
                this.xSpeed=0;
            }else if(this.node.x<-this.node.parent.width/2+80){
                this.node.x=-this.node.parent.width/2+80;
                this.xSpeed=0;
            }
        },


});
