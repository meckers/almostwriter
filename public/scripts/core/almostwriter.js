define([
    'controller/matrix-controller',
    'controller/input-controller',
    'controller/recording-controller',
    'controller/colour-controller',
    'lib/events',
    'core/mediator'
],
    function(MatrixController,
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
                //$('#dump-recording').click(_.bind(this.dump, this));
                $('#toggle-music').click(_.bind(this.toggleMusic, this));
            },

            startApp: function() {
                Mediator.init();
                MatrixController.init();
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
            },

            dump: function() {
                RecordingController.dump();
            },

            toggleMusic: function() {
                var soundElement = document.getElementById('music');
                if (!soundElement.paused) {
                    soundElement.pause();
                    soundElement.currentTime = 0;
                    soundElement.value = "Turn music on";
                }
            }

        };

    });