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

            /**
             * Initialize the controllers that listens for events
             */
            startApp: function() {
                Mediator.init();
                MatrixController.init();
                InputController.init();
                ColourController.init();
                RecordingController.init();
            },

            /**
             * Reset everyting
             */
            reset: function() {
                MatrixController.setup();
                RecordingController.clear();
            },

            /**
             * Play the current message
             */
            play: function() {
                MatrixController.setup();
                RecordingController.replay();
            },

            /**
             * Dump the current message to the console as an array
             */
            dump: function() {
                RecordingController.dump();
            },

            /**
             * Toggles music - sorry for party rocking!
             */
            toggleMusic: function() {
                var soundElement = document.getElementById('music');
                if (!soundElement.paused) {
                    soundElement.pause();
                    document.getElementById('toggle-music').value = 'Turn music on';
                }
                else {
                    soundElement.play();
                    document.getElementById('toggle-music').value = 'Turn music off';
                }
            }

        };

    });