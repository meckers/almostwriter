define([
    'model/matrix',
    'controller/cell-controller',
    'controller/cursor-controller',
    'lib/events'], function(Matrix, CellController, CursorController, Events) {

    return {

        _matrix: null,
        _currentCell: null,
        _currentPosition: [0,0],

        init: function() {
            this._matrix = new Matrix('char-matrix');
            this.listen();
            this.setup();
        },

        /**
         * Listen for incoming keystrokes
         */
        listen: function() {
            Events.register('NORMAL-CHAR', this, _.bind(this.writeChar, this));
            Events.register('SPECIAL-KEY-BACKSPACE', this, _.bind(this.backSpace, this));
            Events.register('SPECIAL-KEY-INSERT', this, _.bind(this.insert, this));

            Events.register('SPECIAL-KEY-ARROW-LEFT', this, _.bind(this.step, this, 0, -1));
            Events.register('SPECIAL-KEY-ARROW-UP', this, _.bind(this.step, this, -1, 0));
            Events.register('SPECIAL-KEY-ARROW-RIGHT', this, _.bind(this.step, this, 0, 1));
            Events.register('SPECIAL-KEY-ARROW-DOWN', this, _.bind(this.step, this, 1, 0));

        },

        /**
         * Initialize the matrix
         */
        setup: function() {
            this.populateWithCells();
            this.setCurrent(0,0);
            CellController.setColour('white');
        },

        /**
         * Finds a single cell in the matrix
         * @param row
         * @param col
         * @returns {*}
         */
        findCell: function(row,col) {
            return this._matrix.getCells()[row][col];
        },

        /**
         * Finds a cell with the help of a position array
         * @param pos
         * @returns {*}
         */
        findCellByPosition: function(pos) {
            return this._matrix.getCells()[pos[0]][pos[1]];
        },

        /**
         * Gets a row from the matrix
         * @param row
         * @returns {*}
         */
        getRow: function(row) {
            return this._matrix.getCells()[row];
        },

        /**
         * Executes a function for each of the cells in the matrix
         * @param fn
         */
        forEachCell: function(fn) {

            var cells = this._matrix.getCells();
            var height = this._matrix.getHeight();
            var width = this._matrix.getWidth();

            for (var r=0; r < height; r++) {
                for (var c=0; c < width; c++) {
                    fn(r, c, cells[r][c]);
                }
            }
        },

        /**
         * Gets the matrix element
         * @returns {Element}
         */
        getMatrixElement: function() {
            return this._matrix.getElement();
        },

        /**
         * Populates the matrix with cells
         */
        populateWithCells: function() {

            var matrixElm = this.getMatrixElement();
            matrixElm.innerHTML = '';

            this.forEachCell(function(r,c,cell) {
                matrixElm.appendChild(cell.getElement());
                CellController.deAnimate(cell);
                CellController.setBlankSpritePosition(cell);
                CellController.assignColour(cell, 'white');
            })
        },

        /**
         * Sets the current position and cell
         * @param row
         * @param col
         */
        setCurrent: function(row, col) {
            this._currentCell = this.findCell(row,col);
            this._currentPosition = [row,col];
            CursorController.setCell(this._currentCell);
        },

        /**
         * Writes a character to the matrix
         * @param strokeInfo
         */
        writeChar: function(strokeInfo) {
            CellController.applyChar(this._currentCell, strokeInfo);
            this.step(0, 1);
        },

        /**
         * Checks to see if the current position is in the top left corner
         * @returns {boolean}
         */
        atFirstCell: function() {
            return this._currentPosition[0] == 0 && this._currentPosition[1] == 0;
        },

        /**
         * Execute a backspace
         */
        backSpace: function() {
            if (!this.atFirstCell() && this._currentPosition[1] != 0)
            {
                this.step(0, -1);
                //this.getCurrentCell().deAnimate();
                this.pullLine();
            }
        },

        /**
         * Insert a space (the opposite of backspace)
         */
        insert: function() {
            this.pushLine();
        },


        /**
         * Move the current position within the matrix
         * @param rowMod
         * @param colMod
         */
        step: function(rowMod, colMod) {

            var curPos = this._currentPosition;
            var newRow = curPos[0] + rowMod;
            var newCol = curPos[1] + colMod;

            if (newCol == 40) {
                newRow += 1;
                newCol = 0;
            }
            else if (newRow == 40) {
                newRow = 39;
            }
            else if (newCol == -1) {
                newRow -= 1;
                newCol = 39;
            }

            this.setCurrent(newRow, newCol);
        },

        /**
         * Shifts the cells after the current column position - in the current row
         */
        pullLine: function() {
            try {
                this.untilEndOfRow(_.bind(this.shiftCellsLeft, this));
            }
            catch (ex) {
                console.log(ex);
            }
        },

        /**
         * Shifts the cells after the current column position - in the current row
         */
        pushLine: function() {
            this.fromEndOfRow(_.bind(this.shiftCellsRight, this));
        },


        shiftCellsRight: function(i, e) {
            if (i > this._currentPosition[1]) {
                var pos = [this._currentPosition[0], i - 1];
                var nextCell = this.findCellByPosition(pos);
                CellController.copyCell(nextCell, e);
                //cell.deAnimate();
            }
            else {
                CellController.setBlankSpritePosition(e);
            }
        },

        shiftCellsLeft: function(i, e) {
            var pos = [this._currentPosition[0], i + 1];
            var nextCell = this.findCellByPosition(pos);
            if (nextCell !== undefined) {
                CellController.copyCell(nextCell, e);
                /*if (!nextCell.isAnimated) {
                    e.deAnimate();
                } */
            }
            else {
                CellController.setBlankSpritePosition(e);
            }
        },

        /**
         * Gets the current column position
         * @returns {*}
         */
        getCurrentCol: function() {
            return this._currentPosition[1];
        },

        /**
         * Gets the current row position
         * @returns {*}
         */
        getCurrentRow: function() {
            return this._currentPosition[0];
        },

        /**
         * Executes a function for each of the subsequent cells in the current row
         * @param fn
         */
        untilEndOfRow: function(fn) {
            var start = this.getCurrentCol();
            var rowN = this.getCurrentRow();
            var row = this._matrix.getRow(rowN);
            for (var c=start; c < row.length; c++) {
                fn(c, this.findCell(rowN, c), this);
            }
        },

        /**
         * Executes a function for each of the previous cells in the current row
         * @param fn
         */
        fromEndOfRow: function(fn) {
            var colN = this.getCurrentCol();
            var rowN = this.getCurrentRow();
            var start = 39;
            for (var c=start; c > colN-1; c--) {
                fn(c, this.findCell(rowN, c), this);
            }
        },

        /**
         * Stop animation of all cells
         */
        deAnimateAll: function() {
            this.forEachCell(function(r,c,e) {
                CellController.deAnimate(e);
        })
    }

    };
});