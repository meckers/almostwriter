define(['controller/animation-controller'], function(AnimationController) {

    return {

        _currentColour: 'white',
        _isAnimated: false,

        _colours: {
            'white' : '#fff',
            'yellow' : 'yellow',
            'lightbrown' : '#C49B39',
            'darkbrown' : '#8C6508',
            'pink' : '#FF8C8C',
            'darkgrey' : '#525252',
            'mediumgrey' : '#8A8A8A'
        },

        /**
         * Apply normal characters
         * @param cell The cell to apply character to
         * @param strokeInfo Object that holds information about the keystroke
         */
        applyChar: function(cell, strokeInfo) {
            var offsetx = strokeInfo.offset[0] * 16;
            var offsety = strokeInfo.offset[1] * 16;
            $(cell.getElement()).css({
                'background-position' : '-' + offsety + 'px -' + offsetx + 'px',
                'background-color' : this._colours[this._currentColour]
            });

            if (strokeInfo.animate) {
                this.animate(cell, true);
            } else {
                this.deAnimate(cell);
            }
        },

        /**
         * Sets the background to a blank space
         * @param cell
         */
        setBlankSpritePosition: function(cell) {
            $(cell.getElement()).css('background-position', '-0px -16px');
        },

        /**
         * Copy all values of one cell element to another
         * @param sourceCell
         * @param destCell
         */
        copyCell: function(sourceCell, destCell) {
            var sourceElem = sourceCell.getElement();
            var attributes = $(sourceElem).prop("attributes");

            $.each(attributes, function() {
                $(destCell.getElement()).attr(this.name, this.value);
            });

            /*
            if (sourceCell.isAnimated) {
                this.animate();
            } */
        },

        /**
         * Sets the colour of subsequently added cells
         * @param colour
         */
        setColour: function(colour) {
            this._currentColour = colour;
        },

        /**
         * Sets the colour of an individual cell
         * @param cell
         * @param colour
         */
        assignColour: function(cell, colour) {
            $(cell.getElement()).css(
                'background-colour', this._colours[colour]
            );
        },

        /**
         * Initiates animation of a character
         * @param cell
         * @param forceSetOrigX
         */
        animate: function(cell, forceSetOrigX) {
            this._isAnimated = true;
            var $elm = $(cell.getElement());
            $elm.addClass("animated");
            if ($elm.attr('orig-x') === undefined || forceSetOrigX) {

                var backPos = $elm.css('background-position');
                var xPosStr = backPos.split(' ')[0].replace('px','');

                $elm.attr('orig-x', xPosStr); //keep track of original background offset
            }

            AnimationController.startAnimation();
        },

        /**
         * Stop animating a cell
         * @param cell
         */
        deAnimate: function(cell) {
            $(cell.getElement()).removeClass("animated");
            this._isAnimated = false;
        }

    };

});