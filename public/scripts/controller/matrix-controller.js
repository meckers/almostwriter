define(['model/matrix', 'controller/cell-controller', 'lib/events'], function(Matrix, CellController, Events) {

    return Class.extend({

        _matrix: null,
        _currentCell: null,
        _currentPosition: [0,0],

        init: function() {
            this._matrix = new Matrix('char-matrix');
            this._currentCell = this.findCell(0,0);
            this.listen();
            this.setup();
        },

        listen: function() {
            Events.register('NORMAL-CHAR', this, _.bind(this.writeChar, this));
            Events.register('SPECIAL-KEY-ARROW-LEFT', this, _.bind(this.step, this, -1, 0));
            Events.register('SPECIAL-KEY-ARROW-UP', this, _.bind(this.step, this, 0, -1));
            Events.register('SPECIAL-KEY-ARROW-RIGHT', this, _.bind(this.step, this, 1, 0));
            Events.register('SPECIAL-KEY-ARROW-DOWN', this, _.bind(this.step, this, 0, 1));
        },

        setup: function() {
            this.populateWithCells();
        },

        findCell: function(row,col) {
            return this._matrix.getCells()[row][col];
        },

        forEachCell: function(fn) {

            var cells = this._matrix.getCells();
            var height = this._matrix.getHeight();
            var width = this._matrix.getWidth();

            for (r=0; r < height; r++) {
                for (c=0; c < width; c++) {
                    fn(r, c, cells[r][c]);
                }
            }
        },

        getMatrixElement: function() {
            return this._matrix.getElement();
        },

        populateWithCells: function() {

            var matrixElm = this.getMatrixElement();

            this.forEachCell(function(r,c,cell) {
                matrixElm.appendChild(cell.getElement());
            })
        },

        setCurrent: function(row, col) {
            $(this._currentCell.getElement()).css('opacity', '1');
            this._currentCell = this.findCell(row,col);
            this._currentPosition = [row,col];
            $(this._currentCell.getElement()).css('opacity', '0.5');
        },

        writeChar: function(strokeInfo) {
            this._currentCell.apply(strokeInfo);
            this.step(1, 0);
        },

        step: function(colMod, rowMod) {

            var curPos = this._currentPosition;
            var newRow = curPos[0] + rowMod;
            var newCol = curPos[1] + colMod;

            if (newCol == 40) {
                newRow += 1;
                newCol = 0;
            }
            else if (newRow == 40) {
                // scroll down... maybe out of scope for this time, so;
                newRow = 39;
            }

            this.setCurrent(newRow, newCol);
        }

    });
});