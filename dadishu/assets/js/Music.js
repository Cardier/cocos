cc.Class({
    extends: cc.Component,

    properties: {
       jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },
    // use this for initialization
    onLoad: function () {
    cc.audioEngine.playMusic(this.jumpAudio,true);
    },
});
