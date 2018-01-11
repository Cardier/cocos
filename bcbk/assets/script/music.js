cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad: function () {
        this.current = cc.audioEngine.play(this.audio, true, 3);
    },

    //onDestroy: function () {
    //    cc.audioEngine.stop(this.current);
    //}
});
