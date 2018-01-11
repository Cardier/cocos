var Constant = require('Constant');

var Background = cc.Class({
    extends: cc.Component,

    properties: {
        // 地板节点数组
        groundNode: {
            default: [],
            type: [cc.Node]
        },
        // 地板图片对象
        groundImg: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
        // 获取屏幕尺寸
        this._size = cc.winSize;
        // 获取地板图片的宽度
        this._width = this.groundImg.spriteFrame.getRect().width;
        // 启动“地板移动控制”计时器
        this.schedule(this.onGroundMove, Constant.GROUND_MOVE_INTERVAL);
    },

    onGroundMove: function() {
        this.groundNode[0].x += Constant.GROUND_VX;
        this.groundNode[1].x += Constant.GROUND_VX;
        if (this.groundNode[0].x + this._width/2 < - this._size.width/2) {
            this.groundNode[0].x = this.groundNode[1].x + this._width - 5;
        }
        if (this.groundNode[1].x + this._width/2 < - this._size.width/2) {
            this.groundNode[1].x = this.groundNode[0].x + this._width - 5;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
