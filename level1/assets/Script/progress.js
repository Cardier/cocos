cc.Class({
    extends: cc.Component,

    properties: {

        horizontalBar: {
            type: cc.ProgressBar,
            default: null
        },

    },

    onLoad: function () {
        this.horizontalBar.progress = 0;
        this.addProgress();
        this.schedule(this.addProgress,1);
    },

    update: function (dt) {

    },
    addProgress:function(){
        var progress = this.horizontalBar.progress;
        //console.log(progress);
        if (progress >= 0) {
            var scoreLength = cc.find('enen_04/Score').getComponent(cc.Label).string;
            //progress = 480*scoreLength/15000;
            progress = 3.2*scoreLength/480;
            //console.log(progress);
        }
        else if(progress >=1){
            progress = 1;
        }
        this.horizontalBar.progress = progress;
    },


});
