define(['lib/events'], function(Events) {
    return {

        _strokeCodes: [],
        _strokeIndex: 0,

        init: function() {
            this.listen();
        },

        listen: function() {
            Events.register('RECORDABLE_STROKE', this, _.bind(this.recordStroke, this));
        },

        recordStroke: function(strokeCode) {
            this._strokeCodes.push(strokeCode);
        },

        replay: function() {
            this._strokeIndex = 0;
            var strokeCode = this._strokeCodes[this._strokeIndex];
            console.log("starting from", this._strokeIndex);
            if (strokeCode) {
                this.playStroke(strokeCode);
            }
        },

        playStroke: function(strokeCode) {
            window.setTimeout(_.bind(this.issueStroke, this, strokeCode), 40);
        },

        issueStroke: function(strokeCode) {

            Events.trigger("RECORDED_STROKE", strokeCode);

            if (this._strokeIndex !== this._strokeCodes.length - 1) {
                this.playStroke(this._strokeCodes[++this._strokeIndex])
            }
        },

        clear: function() {
            this._strokeCodes = [];
        }

    };
});