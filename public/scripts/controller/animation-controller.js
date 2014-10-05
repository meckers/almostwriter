define(function() {

    return {

        _interval: null,
        _horizontalPosition: 0,
        _animating: false,

        /**
         * Starts animation (toggles)
         */
        startAnimation: function() {
            if (!this._animating) {
                this.doAnimation();
            }
        },

        doAnimation: function() {
            this._animating = true;
            this._horizontalPosition = 0;
            this._interval = window.setInterval(_.bind(this.tick, this), 10);
        },


        tick: function() {
            this._horizontalPosition -= 1;
            this.update();

            if(this._horizontalPosition === -16) {
                window.clearInterval(this._interval);
                this.doAnimation();
            }
        },

        /**
         * Animate by shifting the position of the background image
         */
        update: function() {
            $('.animated').each(_.bind(function(i,e) {
                var x = parseInt($(e).attr('orig-x')) + this._horizontalPosition;
                $(e).css('background-position-x', x);
            }, this));
        }

    };
});