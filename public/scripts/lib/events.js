define(function() {

    Listener = function(name, context, callback) {
        this.name = name;
        this.callback = callback;
        this.context = context;
    };

    return {

        listeners: [],

        register: function(name, context, callback) {
            var listener = new Listener(name, context, callback);
            this.listeners.push(listener);
        },

        trigger: function(name, data) {
            _.each(this.listeners, function(element) {
                if (element.name === name) {
                    element.callback.apply(element.context, [data]);
                }
            });
        },

        purge: function() {
            this.listeners = [];
        }
    };
})

