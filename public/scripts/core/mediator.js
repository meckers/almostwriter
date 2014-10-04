define(['lib/events'], function(Events) {

        return {

            init: function() {
                this.listen();
            },

            listen: function() {
                Events.register('INCOMING_STROKE', this, _.bind(this.handleKey, this));
            },

            handleKey: function(strokeInfo) {
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