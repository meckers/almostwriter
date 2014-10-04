define(['controller/animation-controller'], function(AnimationController) {

    return {

        _currentColour: 'white',
        _isAnimated: false,

        init: function() {
        },

        applyChar: function(cell, strokeInfo) {
            var offsetx = strokeInfo.offset[0] * 16;
            var offsety = strokeInfo.offset[1] * 16;
            $(cell.getElement()).css('background-position', '-' + offsety + 'px -' + offsetx + 'px').addClass('colour-' + this._currentColour);

            if (strokeInfo.animate) {
                this.animate(cell, true);
            }
        },

        setBlankSpritePosition: function(cell) {
            $(cell.getElement()).css('background-position', '-0px -16px');
        },

        copyCell: function(sourceCell, destCell) {
            var sourceElem = sourceCell.getElement();
            var attributes = $(sourceElem).prop("attributes");
            var me = this;

            $.each(attributes, function() {
                $(destCell.getElement()).attr(this.name, this.value);
            });

            /*
            if (sourceCell.isAnimated) {
                this.animate();
            } */
        },

        setColour: function(colour) {
            console.log('new colour', colour);
            this._currentColour = colour;
        },

        animate: function(cell, forceSetOrigX) {
            this._isAnimated = true;
            var $elm = $(cell.getElement());
            $elm.addClass("animated");
            if ($elm.attr('orig-x') === undefined || forceSetOrigX) {

                var origX = 0;

                var backPos = $elm.css('background-position');
                var xPosStr = backPos.split(' ')[0].replace('px','');

                $elm.attr('orig-x', xPosStr); //keep track of original background offset
                //$elm.attr('orig-x', $elm.css('background-position-x').replace('px','')); //keep track of original background offset
            }

            AnimationController.startAnimation();

            //Events.trigger("ANIMATED_CHARACTER_ENTERED");
        },

        deAnimate: function(cell) {
            $(cell.getElement()).removeClass("animated");
            this._isAnimated = false;
        }

    };

})