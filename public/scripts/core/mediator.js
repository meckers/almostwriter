define(['lib/events'], function(Events) {


    var Mediator = {

        init: function() {
            this.listen();
        },

        listen: function() {
            Events.register('INCOMING_STROKE', this, _.bind(this.handleKey, this));
        },

        handleKey: function(strokeInfo) {
            if (strokeInfo.offset) {
                Events.trigger('NORMAL-CHAR', strokeInfo);
            }
            else {
                Events.trigger(strokeInfo.id, strokeInfo);
            }
        }

    };


    return Mediator;

});