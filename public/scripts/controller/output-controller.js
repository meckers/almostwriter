define(['lib/events', 'controller/matrix-controller'], function(Events, KeyMap, MatrixController) {

    return Class.extend({

        init: function() {
            this.listen();
        },

        listen: function() {
            //Events.register('INCOMING_STROKE', this, _.bind(this.handleKey, this)); moved to matrix-controller
        },

        handleKey: function(strokeInfo) {
            console.log('display input', strokeInfo);
            // se till att starta det som visar ett tecken eller gör något i matrix här...
        }



    });

});