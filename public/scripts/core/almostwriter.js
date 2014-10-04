define([
    'controller/matrix-controller',
    'controller/cell-controller',
    'controller/input-controller',
    'controller/output-controller',
    'controller/recording-controller',
    'controller/colour-controller',
    'core/mediator'
],
    function(MatrixController,
             CellController,
             InputController,
             OutputController,
             RecordingController,
             ColourController,
             Mediator) {


        return {

            init: function() {
                this.startApp();
            },

            startApp: function() {
                Mediator.init();
                MatrixController.init();
                CellController.init();
                InputController.init();
                OutputController.init();
                ColourController.init();
                RecordingController.init();
            }

        };

    });