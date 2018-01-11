/**
 * @Author: 丁家豪
 * @Date:   2017-09-06T21:54:17+08:00
 * @Email:  13605179478@163.com
 * @Last modified by:   丁家豪
 * @Last modified time: 2017-09-08T17:59:36+08:00
 */

cc.Class({
    extends: cc.Component,

    properties: {

        Col: 0,
        Row: 0,
        Padding: 0,
        SpacingX: 0,
        SpacingY: 0,
        star: {
            default: null,
            type: cc.Prefab
        },
        Score: {
            default: null,
            type: cc.Node
        },
        canvas: cc.Node,
        // steps:{
        //     default: null,
        //     type: cc.Label
        // },
        audio:{
          url:cc.AudioClip,
          default:null
        },
        // avatar:{
        //   default:null,
        //   type:cc.Sprite
        // },
        // nickname:{
        //   default:null,
        //   type:cc.Label
        // }
    },
    reward: 0,
    pSet: null,//坐标矩阵集合
    stars: null,
    mask: null,
    onLoad: function () {
        // this.step= this.steps.string;
        this.beginX = 0;
        this.beginY = 0;
        this.buildCoordinateSet();//根据配置信息生成每个元素的坐标点集合
        this.init();
        this.canTouch = true;
        this.touch();
        this.zhi();     
    },
    start: function () {
        this.check();
        //   this.touchEnd()
    },
    init: function () {//初始化函数，生成star节点，添加监听事件
        var node = this.node;
        this.mask = [];
        this.stars = [];
        this.addStar = [];
        var pSet = this.pSet;
        for (var i = 0; i < this.Row; i++) {
            var arr1 = [];
            var marr = [];
            for (var j = 0; j < this.Col; j++) {
                var ele = cc.instantiate(this.star);
                ele.setPosition(pSet[i][j].x, pSet[i][j].y);
                node.addChild(ele, 0, "ele");
                // pSet[i][j] =ele
                //this.addTouchEvents(ele);
                var com = ele.getComponent('Star');
                com.pos = cc.v2(i, j);

                arr1.push(ele);
                marr.push(0);
            }
            this.mask.push(marr);
            this.stars.push(arr1);
        }
    },


    buildCoordinateSet: function () {//根据配置信息生成每个元素的坐标点对象
        var ele = cc.instantiate(this.star);
        var eleSize = ele.getContentSize();
        this.eleSizeWidth = ~~(eleSize.width);
        this.eleSizeHeight = ~~(eleSize.height);
        this.beginX = ~~((this.node.width - (this.Row - 1) * (this.SpacingX + eleSize.width)-20) / 2);
        this.beginY = ~~(this.Padding + eleSize.height / 2);
        this.pSet = [];
        for (var i = 0; i < this.Row; i++) {
            var arr = [];
            for (var j = 0; j < this.Col + 1; j++) {
                var position = cc.v2(this.beginX + i * (eleSize.width + this.SpacingX), this.beginY + j * (eleSize.height + this.SpacingY));
                // window.console.log(position.toString());
                arr.push(position);
            }
            this.pSet.push(arr);
        }

    },
    PositionToPos: function (x, y) {//屏幕坐标转矩阵坐标

        var pos = cc.v2(Math.floor((x - this.beginX) / (this.eleSizeWidth + this.SpacingX) + 0.5), Math.floor((y - this.beginY) / (this.eleSizeHeight + this.SpacingY) + 0.5));
        return pos;
    },

    // addTouchEvents:function(node){//添加触摸监听事件
    //     this.p1=null;
    //     var p2=null;
    //   // window.console.log("m"+this);
    //   var cur=null
    //     node.on('touchstart',function(event){//传回节点位置
    //         node.select=true;
    //         node.zIndex = 1
    //          cur=node.position
    //         this.p1=node.getComponent('Star').pos;
    //          window.console.log('p1',this.p1);
    //     },this);
    //     node.on('touchmove',function(event){
    //         if(node.select){
    //             var x=event.getLocationX();
    //             var y=event.getLocationY();
    //             if(x>=(cur.x - this.eleSize.width-this.SpacingX)&&x<=(cur.x + this.eleSize.width+this.SpacingX )&&
    //             y<=(cur.y + this.eleSize.height+this.SpacingY)&&y>=(cur.y - this.eleSize.height-this.SpacingY))
    //             {
    //             node.setPosition(x,y);
    //              //window.console.log('x,y',x+" "+y);
    //             }
    //             // else{
    //             //      node.setPosition(cur);
    //             // }
    //         }
    //     },this);
    //     this.canvas.on('touchend',function(event){

    //         node.select=false;
    //         node.zIndex = 0
    //         var x=event.getLocationX();
    //         var y=event.getLocationY();
    //         var p=this.canvas.convertToNodeSpace(event.getLocation());
    //         // cc.log('p',p)
    //         p2=this.PositionToPos(p.x,p.y);
    //          window.console.log('p2',p2);
    //          //cc.log('p2',p2.x)
    //             var cell = this.stars[p2.x][p2.y]
    //             cc.log(cell)
    //         if(this.isAround(this.p1,p2)&&typeof(this.stars[p2.x][p2.y])!='undefined'){
    //             //window.console.log('isAround');
    //             this.changeTwoPos(this.p1,p2);

    //         if(this.checkConnected()){
    //             this.delAndDrop();
    //         }else{
    //           this.changeTwoPos(p2,this.p1);
    //         }
    //         }else{
    //           // node.setPosition(this.pSet[this.p1.x][this.p1.y]);
    //         }

    //     },this);


    // },
    touch: function () {
        var touchStart = function (event) {//传回节点位置
            if (!this.canTouch) {
                return
            }

            var p = this.node.convertToNodeSpace(event.getLocation());
            this.p1 = this.PositionToPos(p.x, p.y);
            if (this.p1.x < 0 || this.p1.x > this.Row - 1 || this.p1.y < 0 || this.p1.y > this.Col - 1) {
                return
            }
            //this.stars.outline.color = new cc.Color(0.5, 0.3, 0.7, 1.0);
            this.cell1 = this.stars[this.p1.x][this.p1.y];
            this.cur = this.pSet[this.p1.x][this.p1.y];
            this.cell1.select = true;
            this.cell1.zIndex = 1;
            this.addStar.push(this.p1);
            if (this.addStar.length == 2) {

                this.cell1.select = false;
                this.cell1.zIndex = 0;
                this.p2 = this.addStar[1];
                //console.log(this.p2);
                this.cell2 = this.stars[this.p2.x][this.p2.y];
                if (this.isAround(this.addStar[0], this.p2) && typeof(this.stars[this.p2.x][this.p2.y]) != 'undefined') {
                    this.changeTwoPos(this.addStar[0], this.p2);
                    if (this.checkConnected()) {
                        this.delAndDrop();
						// this.cutStep();
                    } else {
                        this.changeTwoPos(this.p2, this.addStar[0]);
                    }
                } else {
                    this.cell1.setPosition(this.cur);
                }
                this.addStar.length=0;
            }
            return true;
        };
/*      var touchMove = function (event) {
            if (!this.canTouch) {
                return
            }

            if (this.cell1.select) {

                var x = event.getLocationX();
                var y = event.getLocationY();
                if (x >= (this.cur.x - this.eleSizeWidth - this.SpacingX) && x <= (this.cur.x + this.eleSizeWidth + this.SpacingX ) &&
                    y <= (this.cur.y + this.eleSizeHeight + this.SpacingY) && y >= (this.cur.y - this.eleSizeHeight - this.SpacingY)) {
                    this.cell1.setPosition(x, y);
                }
            }

        };
        var touchEnd = function (event) {

            if (!this.canTouch) {
                return
            }
            var p = this.node.convertToNodeSpace(event.getLocation());
            this.p2 = this.PositionToPos(p.x, p.y);
            if (this.p2.x < 0 || this.p2.x > this.Row - 1 || this.p2.y < 0 || this.p2.y > this.Col - 1) {
                this.cell1.setPosition(this.cur);
                return
            }

            this.cell1.select = false;
            this.cell1.zIndex = 0;
            this.cell2 = this.stars[this.p2.x][this.p2.y];
            if (this.isAround(this.p1, this.p2) && typeof(this.stars[this.p2.x][this.p2.y]) != 'undefined') {
                this.changeTwoPos(this.p1, this.p2);
                if (this.checkConnected()) {
                    this.delAndDrop();
                } else {
                    this.changeTwoPos(this.p2, this.p1);
                }
            } else {
                this.cell1.setPosition(this.cur);
            }
        }; */
        this.node.on(cc.Node.EventType.TOUCH_START, touchStart, this);
        //this.node.on(cc.Node.EventType.TOUCH_MOVE,touchMove,this);
        //this.node.on(cc.Node.EventType.TOUCH_END,touchEnd,this);
    },


    //减步数
    // cutStep:function(){
    //     this.step-=1;
    //     this.steps.string=this.step.toString();
    //     if(this.step<=0){
    //         var a = cc.find('enen_04/Score').getComponent(cc.Label).string;
    //         location.replace(''+this.url+"?score="+a+"&rank="+this.i+"&level="+this.level);
    //         cc.game.pause()
    //     }
    // },



    isAround: function (p1, p2) {//判断矩阵坐标p2是否与p1相邻
        var dis = Math.abs((p2.x - p1.x) + (p2.y - p1.y));
        // window.console.log(dis);
        if (dis == 1) {
            return true;
        }
        return false;
    },
    changeTwoPos: function (p1, p2) {//交换两个star的位置 包括自身存储的位置信息与stars数组内的实例交换
        this.stars[p1.x][p1.y].getComponent('Star').pos = p2;
        this.stars[p1.x][p1.y].setPosition(this.pSet[p2.x][p2.y]);
        this.stars[p2.x][p2.y].getComponent('Star').pos = p1;
        this.stars[p2.x][p2.y].setPosition(this.pSet[p1.x][p1.y]);
        var t = this.stars[p1.x][p1.y];
        this.stars[p1.x][p1.y] = this.stars[p2.x][p2.y];
        this.stars[p2.x][p2.y] = t;
    },
    delAndDrop: function () {
        cc.audioEngine.play(this.audio);
        this.deleteConnected();
        this.dropAndUpdata();
    },
    checkConnected: function () {
        var count1 = this.verticalCheckConnected();
        var count2 = this.horizontalCheckConnected();

        this.reward = this.calScore(count1 + count2);//奖励分数
        // window.console.log(this.reward +"rew");

        return ((count1 + count2) > 0) ? true : false;
    },
    calScore: function (num) {//计算分数
        return num;
    },
    verticalCheckConnected: function () {//纵向检查star的相连形况
        var index1, index2;
        var start, end;
        var count = 0;//记录需要删除的star数
        for (var i = 0; i < this.stars.length; i++) {
            if (typeof(this.stars[i][0]) == 'undefined') {
                continue;
            }
            index1 = this.stars[i][0].getComponent('Star').sfIndex;
            start = 0;
            for (var j = 1; j <= this.stars[i].length; j++) {
                if (j == this.stars[i].length) {//当到达边界值时
                    index2 = -1;
                } else {
                    index2 = this.stars[i][j].getComponent('Star').sfIndex;
                }

                if (index1 != index2) {
                    end = j;
                    if (end - start >= 3) {
                        while (start != end) {
                            this.mask[i][start] = 1;
                            start++;
                            count++;
                        }
                    }
                    start = end;
                    if (start != this.stars[i].length) {
                        index1 = this.stars[i][start].getComponent('Star').sfIndex;
                    }

                }
            }
        }
        return count;
    },
    horizontalCheckConnected: function () {//横向检查star的相连情况
        var index1, index2;
        var start, end;
        var count = 0;//记录需删除的star数
        for (var j = 0; j < this.Col; j++) {
            for (var i = 0; i < this.Row;) {
                if (typeof(this.stars[i][j]) == 'undefined') {
                    i++;
                    continue;
                }
                index1 = this.stars[i][j].getComponent('Star').sfIndex;
                var begin = i;
                end = begin;
                while (end < this.Row) {
                    if (typeof(this.stars[end][j]) == 'undefined') {
                        if (end - begin >= 3) {
                            while (begin != end) {
                                if (this.mask[begin][j] != 1) {
                                    this.mask[begin][j] = 1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    index2 = this.stars[end][j].getComponent('Star').sfIndex;
                    if (index1 != index2) {
                        if (end - begin >= 3) {
                            while (begin != end) {
                                if (this.mask[begin][j] != 1) {
                                    this.mask[begin][j] = 1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    end++;
                }
                if (end == this.Row && end - begin >= 3) {
                    while (begin != end) {
                        if (this.mask[begin][j] != 1) {
                            this.mask[begin][j] = 1;
                            count++;
                        }
                        begin++;
                    }
                }
                i = end;

            }
        }
        return count;
    },

    deleteConnected: function () {//根据mask的状态信息删除相连的star
        var pSet = this.pSet;
        this.canTouch = false;
        for (var i = 0; i < this.Row; i++) {
            var count = 0;
            var start = 0, end;
            var onoff = true;
            for (var j = this.Col - 1; j >= 0; j--) {
                if (this.mask[i][j] == 1) {
                    if (onoff) {
                        start = j;
                        onoff = false;
                    }
                    var ele = cc.instantiate(this.star);
                    ele.setPosition(pSet[i][this.Col].x, pSet[i][this.Col].y);
                    this.node.addChild(ele, 0, "ele");
                    //this.addTouchEvents(ele);
                    this.stars[i].push(ele);
                    var act = cc.sequence(cc.scaleBy(0.01, 0, 0));//消失动画

                    this.stars[i][j].runAction(act);
                }
                if ((this.mask[i][j - 1] != 1 || j - 1 < 0) && onoff == false) {
                    end = j;
                    this.stars[i].splice(end, start - end + 1);//删除star实例
                    onoff = true;
                }
                this.mask[i][j] = 0;
            }
        }
        this.updateScore();//删除相连的stars后更新分数显示

    },
    check: function () {
        if (this.checkConnected()) {
            this.delAndDrop();
        } else {
            this.canTouch = true;
            this.move()
        }

    },
    move: function () {

        for (var i = 0; i < this.stars.length; i++) {
            for (var j = 0; j < this.stars[i].length; j++) {
                // var act=cc.moveTo(0.1,this.pSet[i][j]);
                // this.stars[i][j].runAction(act);
                this.stars[i][j].setPosition(cc.p(~~(this.beginX + i * (this.eleSizeWidth + this.SpacingX)), ~~(this.beginY + j * (this.eleSizeHeight + this.SpacingY))));
                // cc.log(this.stars[i][j].position)
            }
        }
    },

    dropAndUpdata: function () {//下落动画以及更新位置信息
        var finished = cc.callFunc(function (target) {
            this.check();
            //this.canTouch=true
        }, this);

        for (let i = 0; i < this.stars.length; i++) {
            for (let j = 0; j < this.stars[i].length; j++) {
                if (i == this.stars.length - 1 && j == this.stars[i].length - 1) {
                    var act = cc.sequence(cc.moveTo(0.5, cc.p(~~(this.beginX + i * (this.eleSizeWidth + this.SpacingX)), ~~(this.beginY + j * (this.eleSizeHeight + this.SpacingY)))), finished);
                } else {
                    var act = cc.moveTo(0.5, cc.p(~~(this.beginX + i * (this.eleSizeWidth + this.SpacingX)), ~~(this.beginY + j * (this.eleSizeHeight + this.SpacingY))));
                }
                this.stars[i][j].stopAllActions();
                this.stars[i][j].runAction(act);
                var com = this.stars[i][j].getComponent('Star');
                com.pos = cc.v2(i, j);

            }
        }

    },
    updateScore: function () {
        var that=this;
        var score = this.Score.getComponent('Score');//更新分数显示
        score.setReward(this.reward);
        // let a = cc.find('enen_04/Score').getComponent(cc.Label).string;
          // location.replace(''+this.url+"?score="+a+"&rank="+this.i+"&level="+this.level);
          // cc.game.pause();
        score.updateScore();
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
        // this.level = Request["level"];
        this.music = Request["music"];
        // this.avatarurl= Request["avatar"];
        // this.wxname= decodeURI(Request["nickname"]);
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
