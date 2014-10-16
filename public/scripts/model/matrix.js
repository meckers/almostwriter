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
        },

        /**
         * Finds a single cell in the matrix
         * @param row
         * @param col
         * @returns {*}
         */
        findCell: function(row,col) {
            return this.getCells()[row][col];
        },

        /**
         * Finds a cell with the help of a position array
         * @param pos
         * @returns {*}
         */
        findCellByPosition: function(pos) {
            return this.getCells()[pos[0]][pos[1]];
        },

        /**
         * Gets a row from the matrix
         * @param row
         * @returns {*}
         */
        getRow: function(row) {
            return this.getCells()[row];
        },

        /**
         * Executes a function for each of the cells in the matrix
         * @param fn
         */
        forEachCell: function(fn) {
            for (var r=0; r < this._height; r++) {
                for (var c=0; c < this._width; c++) {
                    fn(r, c, this._cells[r][c]);
                }
            }
        }

    });

});