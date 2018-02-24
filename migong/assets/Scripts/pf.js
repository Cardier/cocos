var Helpers = require('Helpers')
cc.Class({
  extends: cc.Component,
  properties: {
    prefabs: {
      default: [],
      type: [cc.Prefab]
    },
    numberToSpawn: 0,
    spawnInterval: 0
  },

  addSpawn: function () {
    if (this.spawnCount >= this.numberToSpawn) {
      this.clearRepeater()
      return
    }
    var randomIdx = Helpers.getRandomInt(0, this.prefabs.length)
    var monster = cc.instantiate(this.prefabs[randomIdx])
    monster.parent = this.node
    monster.position = this.getRandomPosition()
    this.spawnCount++
  },

  // use this for initialization
  onLoad: function () {
    var self = this
    self.spawnCount = 0
    self.schedule(self.addSpawn, self.spawnInterval)
  },

  getRandomPosition: function () {
    return cc.p(Helpers.getRandomInt(180, 1600), Helpers.getRandomInt(150, 1550))
  },

  clearRepeater: function () {
    this.unschedule(this.addSpawn)
  }
})
