define(['lib/events', 'model/key-map'], function(Events, KeyMap) {

    return Class.extend({

        _rules: [],

        init: function() {
            this.startCapture();
            this.listen();
        },

        listen: function() {
            Events.register('RECORDED_STROKE', this, _.bind(this.keyFromRecording, this));
        },

        startCapture: function() {
            window.addEventListener('keydown', _.bind(this.captureKey, this));
        },

        captureKey: function(keyEvent) {
            keyEvent.stopPropagation();
            keyEvent.preventDefault();

            var strokeCode = this.codeify(keyEvent);
            var strokeInfo = KeyMap[strokeCode];

            console.log(strokeCode);

            Events.trigger('INCOMING_STROKE', strokeInfo);
            Events.trigger('RECORDABLE_STROKE', strokeCode);
        },

        keyFromRecording: function(strokeCode) {
            var strokeInfo = KeyMap[strokeCode];
            Events.trigger('INCOMING_STROKE', strokeInfo);
        },

        codeify: function(keyEvent) {
            var strokeCode = keyEvent.which + this.getSpecialKeyString(keyEvent);
            return strokeCode;
        },

        getSpecialKeyString: function(keyEvent) {
            var specials = keyEvent.shiftKey ? 'sh' : '';
            specials += keyEvent.altKey ? 'al' : '';
            specials += keyEvent.ctrlKey ? 'ct' : '';
            return specials.length !== 0 ? '+' + specials : '';
        }

    })

})