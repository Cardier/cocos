cc.Class({
  extends: cc.Component,

  properties: {

  },

  // use this for initialization
  onLoad: function () {
  },
  touch: function () {
    var self = this
    self.moveToPos = cc.p(0, 0)
    self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
      var touches = event.getTouches()
      var touchLoc = touches[0].getLocation()
      self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc)
      var ub = self.node.getBoundingBox()
      if (cc.rectContainsPoint(ub, self.moveToPos)) {
        self.node.runAction(cc.sequence(cc.moveBy(2, cc.p(0, -1000)), cc.callFunc(function () {
          self.i++
          Global.qscroe++
          self.node.destroy()
        }, self)))
      }
    }, self.node)
  },
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

// },
})
