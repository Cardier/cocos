cc.Class({
    extends: cc.Component,

    properties: {
     scoreDisplay:{
         default:null,
         type:cc.Label
     },
    },

    // use this for initialization
    onLoad: function () {
    this.score = 0;
    this.score =  Global.qscroe
    this.scoreDisplay.string =  this.score.toString();
     // this.scoreDisplay.string = Global.qscroe.toString()

    },
     re:function(){
        cc.director.loadScene('Game');
     },
     paihang:function(){
         
     },
     xianyao:function(){
         
     }
     
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
