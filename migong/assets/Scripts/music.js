cc.Class({
  extends: cc.Component,

  properties: {
    jumpAudio: {
      default: null,
      url: cc.AudioClip
    },
    // audioSource: {
    //   type: cc.AudioSource,
    //   default: null
    // },
  },
  playAudio:function(){
    // console.log("playState"+this.audioSource.isPlaying);
    this.audioSource.play();
    // console.log(this.audioSource.isPlaying);
  },
  // use this for initialization
  onLoad: function () {
    // console.log(this.jumpAudio);
    cc.audioEngine.play(this.jumpAudio, true,3);
    // this.playAudio();
    // cc.audioEngine.play(this.jumpAudio,true,5);
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

// },
})
