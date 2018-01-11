cc.Class({
    extends: cc.Component,

    properties: {
      leftpre:cc.Node,
      rightpre:cc.Node,
      treelift:cc.Node,
      treeright:cc.Node,
      node1:cc.Node,
      node2:cc.Node,
      node3:cc.Node,
      node4:cc.Node,
      node5:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.num = 0
        this.addpre1()
        this.addpre2()
        this.addpre3()
        this.addpre4()
        this.addpre5()
        this.addpre6()
        this.addpre7()
        this.addpre8()
        this.addpre9()
    },
    addpre1:function(){
        this.unschedule(this.addpre1);
        this.count1 = Math.random()*(3-this.num*0.2) + 1
        this.schedule(this.addpre1,this.count1);
        this.leftpre.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(-350,-200))
    },
    addpre2:function(){
        this.unschedule(this.addpre2);
        this.count2 = Math.random()*(3-this.num*0.2) + 1
        this.schedule(this.addpre2,this.count2);
        this.rightpre.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(350,-200))
    },
     addpre3:function(){
        this.unschedule(this.addpre3);
        this.count3 = 1
        this.schedule(this.addpre3,this.count3);
        this.treelift.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(-300,-300))
    }, 
    addpre4:function(){
        this.unschedule(this.addpre4);
        this.schedule(this.addpre4,this.count3);
        this.treeright.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(300,-300))
    },

    addpre5:function(){
        this.unschedule(this.addpre5);
        this.count5 = Math.random()*(-this.num*0.2) + 1
        this.schedule(this.addpre5,this.count5);
        this.node1.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(-400,-800))
    },
    addpre6:function(){
        this.unschedule(this.addpre6);
        this.count6 = Math.random()*(2-this.num*0.2) + 1
        this.schedule(this.addpre6,this.count6);
        this.node2.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(0,-1000))
    },
    addpre7:function(){
        this.unschedule(this.addpre7);
        this.count7 = Math.random()*(2-this.num*0.2) + 1
        this.schedule(this.addpre7,this.count7);
        this.node3.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(400,-850))
    },
    addpre8:function(){
        this.unschedule(this.addpre8);
        this.count8 = Math.random()*(2-this.num*0.2) + 1
        this.schedule(this.addpre8,this.count8);
        this.node4.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(320,-900))
    },
    addpre9:function(){
        this.unschedule(this.addpre9);
        this.count9 = Math.random()*(2-this.num*0.2) + 1
        this.schedule(this.addpre9,this.count9);
        this.node5.getComponent('pre').addSpawn((3-this.num*0.2),cc.p(-320,-950))
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
