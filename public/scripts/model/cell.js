define(function() {

    return Class.extend({

        _elm : null,

        init: function() {
            this._elm = this.createCellElement();
        },

        getElement: function() {
            return this._elm;
        },

        createCellElement: function() {
            return $(_.tmpl('#template-cell')())[0];          // note: this seems to be slower than creating the element with for example jQuery.
        }/*,

        apply: function(strokeInfo) {

            var offsetx = strokeInfo.offset[0] * 16;
            var offsety = strokeInfo.offset[1] * 16;

            $(this._elm).css('background-position', '-' + offsety + 'px -' + offsetx + 'px');
        }  */

    });

})