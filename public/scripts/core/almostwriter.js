define([
    'controller/matrix-controller',
    'controller/input-controller',
    'controller/output-controller',
    'controller/recording-controller',
    'core/mediator'],
    function(MatrixController,
             InputController,
             OutputController,
             RecordingController,
             Mediator) {

                return Class.extend({

                    _page : null,
                    _matrixController : null,
                    _inputController : null,
                    _outputController : null,
                    _recordingController: null,

                    init: function() {
                        this._matrixController = new MatrixController();
                        this._inputController = new InputController();
                        this._outputController = new OutputController();
                        this._recordingController = new RecordingController();
                        Mediator.init();
                    },

                    listen: function() {

                    },

                    run: function() {
                    },

                    play: function() {
                        this._recordingController.replay();
                    }
    });

})