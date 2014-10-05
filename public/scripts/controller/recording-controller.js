define(['lib/events', 'core/demo-message'], function(Events, DemoMessage) {
    return {

        _strokeCodes: [],
        _strokeIndex: 0,
        _playing: false,
        _rate: 60,

        init: function() {
            this.listen();
            this.playDemo();
        },

        listen: function() {
            Events.register('RECORDABLE_STROKE', this, _.bind(this.recordStroke, this));
            Events.register('SPECIAL-KEY-PAUSE', this, _.bind(this.pause, this));
        },

        playDemo: function() {
            if (DemoMessage.length > 0) {
                this._strokeCodes = DemoMessage;
                this.replay();
            }
        },

        recordStroke: function(strokeCode) {
            this._strokeCodes.push(strokeCode);
        },

        replay: function() {
                this._playing = true;
                this._strokeIndex = 0;
                var strokeCode = this._strokeCodes[this._strokeIndex];
                if (strokeCode) {
                    this.playStroke(strokeCode);
                }
        },

        playStroke: function(strokeCode) {
            if (this._playing) {
                window.setTimeout(_.bind(this.issueStroke, this, strokeCode), this._rate);
            }
        },

        pause: function() {
            this._playing = !this._playing;
        },

        issueStroke: function(strokeCode) {

            Events.trigger("RECORDED_STROKE", strokeCode);

            if (this._strokeIndex !== this._strokeCodes.length - 1) {
                this.playStroke(this._strokeCodes[++this._strokeIndex])
            }
        },

        dump: function() {
            console.log(JSON.stringify(this._strokeCodes));
        },


        clear: function() {
            this._strokeCodes = [];
        }

    };
});