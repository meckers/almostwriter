define(['model/cell'], function(Cell) {

    return Class.extend({

        _width: 40,
        _height: 40,
        _cells: [],

        init: function(elementId) {
            this._elm = document.getElementById(elementId);
            this.initCells();
        },

        getWidth: function() {
            return this._width;
        },

        getHeight: function() {
            return this._height;
        },

        getElement: function() {
            return this._elm;
        },

        initCells: function() {
            for (var i=0; i<this._height; i++) {
                this._cells[i] = [];
                for (var j=0; j<this._width; j++) {
                    this._cells[i][j] = new Cell();
                }
            }
        },

        getCells: function() {
            return this._cells;
        },

        getRow: function(r) {
            return this._cells[r];
        }

    });

});