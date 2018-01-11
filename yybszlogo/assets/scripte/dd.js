var State = cc.Enum({
    yahuang: -1,
    sc: -1
});
window.gobel = {
    boom: null
};
cc.Class({
    extends: cc.Component,

    properties: {
        zhua: cc.Node,
        jia1: cc.Node,
        jia2: cc.Node,
        jia3: cc.Node,
        jia4: cc.Node,
        jia5: cc.Node,
        jia6: cc.Node,
        jia7: cc.Node,
        jia8: cc.Node,
        jia9: cc.Node,
        jia10: cc.Node,
        jia11:cc.Node,
        jia12:cc.Node,
        zhuah: cc.Node,
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        time: {
            default: null,
            type: cc.Label
        },
        score1: cc.Prefab, 
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this.startPos = this.node.position;
        this.shakeAction = cc.repeatForever(cc.sequence(cc.rotateTo(1, 45), cc.rotateTo(1, -45)));
        this.node.runAction(this.shakeAction);
        this.state = State.yahuang;
        this.touch();
        this.score = 0;
        this.time1 = 0;
        this.schedule(this.djs, 1);
        this.end = false;
        this.zhi()
    },
    zhi: function () {
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
    touch: function () {
        var self = this;
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                if (this.state == State.yahuang) {
                    this.scale()
                }
                return true;
            }.bind(self),
            onTouchEnded: function (touch, event) {

            }.bind(self)
        });
        cc.eventManager.addListener(listener1, this.node);
    },

    scale: function () {
        this.node.stopAllActions();
        this.state = State.sc;
        var f1 = cc.moveBy(1, cc.p(-500 * Math.tan(Math.PI / 180 * this.node.rotation), -500));
        this.node.runAction(f1);
    },
    hui: function (number) {
        this.node.stopAllActions();
        cc.director.getCollisionManager().enabled = false;
        if (number === 0) {
            this.zhua.active = false;
            this.zhuah.active = true;
        }
        var f2 = cc.moveTo((0.5), this.startPos);
        var f3 = cc.sequence(f2, cc.callFunc(function () {
            this.zhuah.active =false;
            this.zhua.active = true;
            for (var i = 1; i < 13; i++) {
                this['jia' + i].active = false
            }
            this.node.runAction(this.shakeAction);
            cc.director.getCollisionManager().enabled = true;
            this.state = State.yahuang;
        }, this));
        this.node.runAction(f3)
    },
    SeizeFailure: function (jia, number, other) {
        var self = this;
        var f1 = cc.moveBy(0.05, cc.p(20, 0));
        var f2 = cc.moveBy(0.05, cc.p(-20, 0));
        jia.active = true;
        this.zhua.active = false;
        other.node.active = false;
        this.node.stopAllActions();
        var f3 = cc.sequence(f1, f2, f1, f2, f1, f2, cc.callFunc(function () {
            jia.active = false;
            this.zhuah.active = true;
            other.node.active = true;
            var f4 = cc.moveBy(2, cc.p(0, -1000));
            other.node.runAction(f4)
        }, this), cc.callFunc(function () {
            this.hui(0)
        }, self));
        jia.runAction(f3)

    },
    generate: function (jia, number) {
        var monster = cc.instantiate(this['score1']);
        monster.parent = this.node;
        monster.position = jia.position;
    },
    seizeSuccess: function (jia, number, other) {
        var f1 = cc.moveBy(0.05, cc.p(20, 0));
        var f2 = cc.moveBy(0.05, cc.p(-20, 0));
        this.zhua.active= false;
        this.zhuah.active = false;
        if (number < 13) {
            this.generate(jia, 1);
            jia.active = true;
            other.node.active = false;
            this.zhuah.active = false;
            this.gainScore(1);
            var f3 = cc.sequence(f1, f2, cc.callFunc(function () {
            }, jia));
            jia.runAction(f3);
            this.hui(0)
        }else {
            this.zhuah.active = false;
            this.reScore();
            this.hui(0)
        }

    },
    stochastic: function (other) {
        var st =1;
        this.zhua.active = false;

        switch (st) {
            case 1:
                this.generate(this.zhua, 1);
                break;
        }
        if (st < 4) {
            this['jia' + st].active = true;
            other.node.active = false;
            this.hui(st);
            this.gainScore(st);
        }

    },
    onCollisionEnter: function (other, self) {
        var i = Math.random();
        var a = 0.2;
        // console.log(this[jiaNum]);
        switch (other.node.group) {
            case '1':
                if (i < a) {
                    this.SeizeFailure(this.jia1, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia1, 1, other)
                }
                break;
            case '2':
                if (i < a) {
                    this.SeizeFailure(this.jia2, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia2, 1, other)
                }
                break;
            case '3':
                if (i < a) {
                    this.SeizeFailure(this.jia3, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia3, 1, other)
                }
                break;
            case '4':
                if (i < a) {
                    this.SeizeFailure(this.jia4, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia4, 1, other)
                }
                break;
            case '5':
                if (i < a) {
                    this.SeizeFailure(this.jia5, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia5, 1, other)
                }
                break;
            case '6':
                if (i < a) {
                    this.SeizeFailure(this.jia6, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia6, 1, other)
                }
                break;
            case '7':
                if (i < a) {
                    this.SeizeFailure(this.jia7, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia7, 1, other)
                }
                break;
            case '8':
                if (i < a) {
                    this.SeizeFailure(this.jia8, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia8, 1, other)
                }
                break;
            case '9':
                if (i < a) {
                    this.SeizeFailure(this.jia9, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia9, 1, other)
                }
                break;
            case '10':
                if (i < a) {
                    this.SeizeFailure(this.jia10, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia10, 1, other)
                }
                break;
            case '11':
                if (i < a) {
                    this.SeizeFailure(this.jia11, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia11, 1, other)
                }
                break;
            case '12':
                if (i < a) {
                    this.SeizeFailure(this.jia12, 1, other);
                }
                else {
                    this.seizeSuccess(this.jia12, 1, other)
                }
                break;
            case "wall":
                this.hui(0);
                break;
        }

    },
    onDisabled: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    gainScore: function (number) {
        this.score += number;
        this.scoreDisplay.string = this.score.toString();
    },
    reScore: function () {
        this.score -= 3;
        if (this.score <= 0) {
            this.score = 0;
        }
        this.scoreDisplay.string = this.score.toString();
    },
    djs: function () {
        this.time1++;
        this.time.string = 60 - this.time1.toString();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.zhua < -280) {
            this.hui(0);
        }
        if (this.time1 > 59 && !this.end) {

            this.unschedule(this.djs);
            var a = this.score.toString();
            location.replace('' + this.url + '?score=' + a+"&rank="+this.i);
            this.end = true;
            cc.game.pause();

        }
    }
});
function GetRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}



