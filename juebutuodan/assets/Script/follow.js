cc.Class({
  extends: cc.Component,
  properties: {
    followSpeed: 1000
  },
  // use this for initialization
  onLoad: function () {
    this.flag=true;
  },
  getPlayerDistanceY: function () {
    // 根据 player 节点位置判断距离
    let playerNode=cc.find("Canvas/player")
    let playerPosY = playerNode.positionY;
    // 根据两点位置计算两点之间y轴距离
    // console.log(playerPosY,this.node.positionY);
    let distY = this.node.positionY-playerPosY;
    // console.log(distY);
    return distY;
  },
  update: function (dt) {
    let self=this;
    let playerNode=cc.find("Canvas/player");
    let playerPos = playerNode.position;
    let dist = cc.pDistance(self.node.position, playerPos);
    // console.log(self.node.getPositionY(),playerNode.getPositionY());
    // console.log(this.flag);
    if(self.node.getPositionY()<playerNode.getPositionY()+400&&this.flag===true){
      var num=Math.random()*0.25+0.5;
      let action2=cc.moveTo(num,playerPos);
      let finished=cc.callFunc(function(){
        self.node.destroy();
        window.qscroe+=1;
      },self); 
      let myseq=cc.sequence(action2,finished);
      self.node.runAction(myseq);
      this.flag=false;
      // this.node.destroy();
    }else if(this.flag===true){
      var oldPos = self.node.position;
      var direction = cc.pNormalize(cc.pSub(playerPos, oldPos));
      var newPos = cc.pAdd(oldPos, cc.pMult(direction, self.followSpeed * dt/4));
      self.node.setPosition(newPos);
    }else{
      return false;
    }
  }
});

