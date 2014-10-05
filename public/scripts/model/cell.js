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
        }

    });

})