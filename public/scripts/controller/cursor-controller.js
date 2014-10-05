define(function() {

    return {

        _element: null,
        _interval: null,
        _cell: null,

        /**
         * Creates the cursor element
         */
        createElement: function() {
            this._element = $("<div></div>");
            this._element.css({
                'width': 16,
                'height': 16,
                'background-color': 'white',
                'position': 'absolute'
            });
            this._element.className = 'cursor';
            this.blink();
        },


        /**
         * Blink the cursor
         */
        blink: function() {
            this.interval = window.setInterval(_.bind(function() {
                this._element.css('display', this._element.css('display') == 'block' ? 'none' : 'block');
            }, this), 750);
        },

        /**
         * Assigns the cursor to a cell
         * @param cell
         */
        setCell: function(cell) {

            if (this._element == null) {
                this.createElement();
            }

            if (this._cell !== null) {
                $(this._cell.getElement()).remove('.cursor');
            }
            this._cell = cell;
            $(this._cell.getElement()).append(this._element);
        }

    }

});