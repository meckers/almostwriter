define(['model/matrix', 'controller/cell-controller', 'lib/events'], function(Matrix, CellController, Events) {

    return {

        init: function() {
            this.listen();
        },

        /**
         * Listen for key combinations that changes colour
         */
        listen: function() {
            Events.register('SPECIAL-KEY-COLOUR-WHITE', this, _.bind(this.colour, this, 'white'));
            Events.register('SPECIAL-KEY-COLOUR-YELLOW', this, _.bind(this.colour, this, 'yellow'));
            Events.register('SPECIAL-KEY-COLOUR-LIGHTBROWN', this, _.bind(this.colour, this, 'lightbrown'));
            Events.register('SPECIAL-KEY-COLOUR-DARKBROWN', this, _.bind(this.colour, this, 'darkbrown'));
            Events.register('SPECIAL-KEY-COLOUR-PINK', this, _.bind(this.colour, this, 'pink'));
            Events.register('SPECIAL-KEY-COLOUR-DARKGREY', this, _.bind(this.colour, this, 'darkgrey'));
            Events.register('SPECIAL-KEY-COLOUR-MEDIUMGREY', this, _.bind(this.colour, this, 'mediumgrey'));
        },

        colour: function(colour) {
            CellController.setColour(colour);
        }

    };
});