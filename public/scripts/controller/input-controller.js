define(['lib/events', 'model/key-map'], function(Events, KeyMap) {

    return {

        _rules: [],

        init: function() {
            this.startCapture();
            this.listen();
        },

        /**
         * Listen for keystrokes from recording
         */
        listen: function() {
            Events.register('RECORDED_STROKE', this, _.bind(this.keyFromRecording, this));
        },

        /**
         * Starts capturing keydown events
         */
        startCapture: function() {
            window.addEventListener('keydown', _.bind(this.captureKey, this));
        },

        /**
         * Captures a key
         * @param keyEvent
         */
        captureKey: function(keyEvent) {
            keyEvent.stopPropagation();
            keyEvent.preventDefault();

            var strokeCode = this.codeify(keyEvent);
            var strokeInfo = KeyMap[strokeCode];

            // Issue stroke info to relevant listeners
            Events.trigger('INCOMING_STROKE', strokeInfo);
            Events.trigger('RECORDABLE_STROKE', strokeCode);
        },

        /**
         * Handles an individual key coming from a recording that is being played back
         * @param strokeCode
         */
        keyFromRecording: function(strokeCode) {
            var strokeInfo = KeyMap[strokeCode];
            Events.trigger('INCOMING_STROKE', strokeInfo);
        },

        /**
         * Build a code that represents the key being pressed
         * @param keyEvent
         * @returns {*}
         */
        codeify: function(keyEvent) {
            return keyEvent.which + this.getSpecialKeyString(keyEvent);
        },

        /**
         * In case of shift, alt or ctrl, add relevant information to the code
         * @param keyEvent
         * @returns {string}
         */
        getSpecialKeyString: function(keyEvent) {
            var specials = keyEvent.shiftKey ? 'sh' : '';
            specials += keyEvent.altKey ? 'al' : '';
            specials += keyEvent.ctrlKey ? 'ct' : '';
            return specials.length !== 0 ? '+' + specials : '';
        }

    };

});