define(['lib/events'], function(Events) {

        return {

            init: function() {
                this.listen();
            },

            listen: function() {
                Events.register('INCOMING_STROKE', this, _.bind(this.handleKey, this));
            },

            /**
             * Splits the stroke "stream" so that ordinary keys uses separate events from the special keys.
             * @param strokeInfo
             */
            handleKey: function(strokeInfo) {
                console.log('handling key', strokeInfo);
                if (strokeInfo) {
                    if (strokeInfo.offset) {
                        Events.trigger('NORMAL-CHAR', strokeInfo);
                    }
                    else {
                        Events.trigger('SPECIAL-KEY-' + strokeInfo.id, strokeInfo);
                    }
                }
            }

        };

});