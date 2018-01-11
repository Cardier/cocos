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
    },

    update: function (dt) {
    var progress = this.horizontalBar.progress;
    if (progress >= 0) {
        progress += 0.1*dt/6;
    }
    else if(progress >=1){
        progress = 1;
    }
    this.horizontalBar.progress = progress;
    },
    
  
});

