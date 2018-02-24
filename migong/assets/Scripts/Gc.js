window.Global = {
  qscroe: 0
}
cc.Class({
  extends: cc.Component,
  properties: {
    speed: cc.v2(0, 0),
    time: {
      default: null,
      type: cc.Label
    }
  },

  // use this for initialization
  onLoad: function () {
    Global.qscroe = 0
    this.GSensor()
    cc.director.getCollisionManager().enabled = true
    // cc.director.getCollisionManager().enabledDebugDraw = true
    this.collisionX = 0
    this.collisionY = 0
    this.time1 = 0
    this.schedule(this.djs, 1)
    this.end = false
  },
  GSensor: function () {
    cc.inputManager.setAccelerometerEnabled(true)
    var self = this
    var listener1 = cc.EventListener.create({
      event: cc.EventListener.ACCELERATION,
      callback: function (accelEvent, event) {
        self.speed.x = accelEvent.x
        self.speed.y = accelEvent.y
        return true
      }.bind(self)
    })
    cc.eventManager.addListener(listener1, this.node)
  },
  onCollisionEnter: function (other, self) {
    if (other.node.group === 'chukuo' && !this.end) {
      this.unschedule(this.djs)
      location.replace('http://game.guangjixinxi.com/hfwcc/Mobile/Game/getResult?arr=' + [this.time1, Global.qscroe])
      this.end = true
      cc.game.pause()
      cc.log([this.time1, Global.qscroe])
    }
    var otherAabb = other.world.aabb
    var otherPreAabb = other.world.preAabb.clone()

    var selfAabb = self.world.aabb
    var selfPreAabb = self.world.preAabb.clone()

    selfPreAabb.x = selfAabb.x
    otherPreAabb.x = otherAabb.x

    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
        this.node.x = otherPreAabb.xMax - this.node.parent.x
        this.collisionX = -1
      }
      else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
        this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x
        this.collisionX = 1
      }

      this.speed.x = 0
      other.touchingX = true
      return
    }

    selfPreAabb.y = selfAabb.y
    otherPreAabb.y = otherAabb.y

    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
      if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
        this.node.y = otherPreAabb.yMax - this.node.parent.y
        this.collisionY = -1
      }
      else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
        this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y
        this.collisionY = 1
      }
      this.speed.y = 0
      other.touchingY = true
    }
  },

  onCollisionExit: function (other) {
    if (other.touchingX) {
      this.collisionX = 0
      other.touchingX = false
    }
    else if (other.touchingY) {
      this.collisionY = 0
      other.touchingY = false
    }
  },
  djs: function () {
    this.time1++
    this.time.string = this.time1.toString()
  },
  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (this.speed.x * this.collisionX > 0) {
      this.speed.x = 0
    }
    if (this.speed.y * this.collisionY > 0) {
      this.speed.y = 0
    }
    if (Math.abs(this.speed.y) > 2) {
      this.speed.y = this.speed.y > 0 ? 2 : -2
    }
    if (Math.abs(this.speed.x) > 2) {
      this.speed.x = this.speed.x > 0 ? 2 : -2
    }
    this.node.x += this.speed.x * 15
    this.node.y += this.speed.y * 15
  }
})
