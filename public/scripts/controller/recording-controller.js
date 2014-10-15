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

        /**
         * Listen for events
         */
        listen: function() {
            Events.register('RECORDABLE_STROKE', this, _.bind(this.recordStroke, this));
            Events.register('SPECIAL-KEY-PAUSE', this, _.bind(this.pause, this));
        },

        /**
         * Plays the demo from a "hard coded" array
         */
        playDemo: function() {
            if (DemoMessage.length > 0) {
                this._strokeCodes = DemoMessage;
                this.replay();
            }
        },

        /**
         * Records a keystroke
         * @param strokeCode
         */
        recordStroke: function(strokeCode) {
            this._strokeCodes.push(strokeCode);
        },

        /**
         * Plays back the current message
         */
        replay: function() {
            this._playing = true;
            this._strokeIndex = 0;
            var strokeCode = this._strokeCodes[this._strokeIndex];
            if (strokeCode) {
                this.playStroke(strokeCode);
            }
        },

        /**
         * Plays an individual stroke
         * @param strokeCode
         */
        playStroke: function(strokeCode) {
            if (this._playing) {
                window.setTimeout(_.bind(this.issueStroke, this, strokeCode), this._rate);
            }
        },

        /**
         * Pause the playback
         */
        pause: function() {
            this._playing = !this._playing;
        },

        /**
         * Broadcast a recorded key stroke
         * @param strokeCode
         */
        issueStroke: function(strokeCode) {

            Events.trigger("RECORDED_STROKE", strokeCode);

            if (this._playing && this._strokeIndex !== this._strokeCodes.length - 1) {
                this.playStroke(this._strokeCodes[++this._strokeIndex])
            }
        },

        /**
         * Dumps the current array to the console (useful for making a demo message)
         */
        dump: function() {
            console.log(JSON.stringify(this._strokeCodes));
        },


        /**
         * Clear the recorded strokes
         */
        clear: function() {
            this._playing = false;
            this._strokeCodes = [];
        }

    };
});