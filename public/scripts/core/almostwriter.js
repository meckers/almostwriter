define([
    'controller/matrix-controller',
    'controller/cell-controller',
    'controller/input-controller',
    'controller/recording-controller',
    'controller/colour-controller',
    'lib/events',
    'core/mediator'
],
    function(MatrixController,
             CellController,
             InputController,
             RecordingController,
             ColourController,
             Events,
             Mediator) {


        return {

            init: function() {
                this.startApp();
                $('#start-recording').click(_.bind(this.reset, this));
                $('#play-recording').click(_.bind(this.play, this));
            },

            startApp: function() {
                Mediator.init();
                MatrixController.init();
                CellController.init();
                InputController.init();
                ColourController.init();
                RecordingController.init();
            },

            reset: function() {
                MatrixController.setup();
                RecordingController.clear();
            },

            play: function() {
                MatrixController.setup();
                RecordingController.replay();
            }

        };

    });