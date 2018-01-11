cc.Class({
    extends: cc.Component,

    properties: {
        kuai_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.kuaiNodeList = [];
        for (let i = 0 ; i < 4 ; i ++){
            this.addKuai();
        }
    },

    addKuai: function(){
        const numberList = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        let typeList = [1,1];
        let index = Math.floor(Math.random() * numberList.length);
        typeList.push(numberList[index]);
        numberList.splice(index, 1);
        typeList.sort(function(a,b){
           // return Math.floor(Math.random() * 2)?true: false
           return Math.random()>0.5?-1:1;
        });
        for (let i = 0 ; i < typeList.length ; i ++){
            let node = cc.instantiate(this.kuai_prefab);
            node.parent = this.node;
            node.position = {
                x: 158 * (typeList.length - 1) * - 0.5 + 158 * i,
                y: Math.floor(this.kuaiNodeList.length / typeList.length) * 208 - 370
            }
            node.getComponent("kuai").initWithData(typeList[i], this.touchCallBack.bind(this));
            this.kuaiNodeList.push(node);
        }


    },

    touchCallBack: function(target){
        for (let i = 0 ; i < this.kuaiNodeList.length; i ++){
            if (this.kuaiNodeList[i] === target){
                if (i < 3){
                    // console.log("下落");
                    this.moveDown();
                    this.gainScore();
                }

            }
        }
    },

    moveDown: function(){
        for (var i = 0 ; i < this.kuaiNodeList.length ; i ++){
            let node = this.kuaiNodeList[i];
            // var action = cc.moveTo(0.5, cc.p(node.position.x, node.position.y - 200));
            if (i < 3){
                node.destroy();
            }else{
                var action = cc.moveBy(0.2, cc.p(0,-208));
                node.runAction(action);
            }

        }

        this.kuaiNodeList.splice(0,3);
        this.addKuai();
    },
      gainScore:function(){
        this.score= parseInt(cc.find('Canvas/score').getComponent(cc.Label).string);
        this.score++;
        cc.find('Canvas/score').getComponent(cc.Label).string = this.score;
    }

});
