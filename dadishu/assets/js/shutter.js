cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bullet: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var scene = cc.director.getScene();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                var touchLoc = touch.getLocation();
                var bullet = cc.instantiate(this.bullet);
                if(!bullet)
                {
                    cc.log('没有实例化')
                    return
                }
                bullet.position = cc.p(touchLoc.x,touchLoc.y);
                bullet.active = true;
                bullet.zIndex = 3;
                scene.addChild(bullet);
                return true;
            },
        }, this.node);
    },
    
  

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
