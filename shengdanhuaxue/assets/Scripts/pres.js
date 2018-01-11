cc.Class({
    extends: cc.Component,

    properties: {
      leftpre:cc.Node,
      rightpre:cc.Node,
      node1:cc.Node,
      node2:cc.Node,
      node3:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
    this.num = 0
    this.addpre1()
    this.addpre2()
    this.addpre5()
    this.addpre6()
    this.addpre7()
    },
    addpre1:function(){
        this.unschedule(this.addpre1);
        this.count1 = Math.random()*(.9-this.num*0.2) + 1
        this.schedule(this.addpre1,this.count1);
        this.leftpre.getComponent('pre').addSpawn((2-this.num*0.2),cc.p(-220,-300))
    },
    addpre2:function(){
        this.unschedule(this.addpre2);
        this.count2 = Math.random()*(.9-this.num*0.2) + 1
        this.schedule(this.addpre2,this.count2);
        this.rightpre.getComponent('pre').addSpawn((2-this.num*0.2),cc.p(220,-300))
    },

    addpre5:function(){
        this.unschedule(this.addpre5);
        this.count5 = Math.random()*(3-this.num*0.2) + 2
        this.schedule(this.addpre5,this.count5);
        this.node1.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(-200,-480))
    },
    addpre6:function(){
        this.unschedule(this.addpre6);
        this.count6 = Math.random()*(3-this.num*0.2) + 2
        this.schedule(this.addpre6,this.count6);
        this.node2.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(0,-550))
    },
    addpre7:function(){
        this.unschedule(this.addpre7);
        this.count7 = Math.random()*(3-this.num*0.2) + 2
        this.schedule(this.addpre7,this.count7);
        this.node3.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(200,-480))
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
