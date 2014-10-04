define(function() {

    return Class.extend({

        init: function() {
        },

        applyChar: function(cell, chr, animate) {

            var pos = SpriteAgent.getPositionForChar(chr);

            $(cell.getElement()).css({
                'background-position': '-' + pos.left + 'px ' + '-' + pos.top + 'px'
            });

            /*
            if (animate) {
                this.animate(true);
            }
            else {
                this.deAnimate();
            } */
        },

        setBlankSpritePosition: function(cell) {
            $(cell.getElement()).css('background-position', '-0px -16px');
        }

    })

})