require(['core/almostwriter', 'core/extensions'], function(AlmostWriter) {

    /**
     * Initiate the awesomeness!
     */
    AlmostWriter.init();

    /**
     * Expose some global functions for debugging purposes.
     */
    play = function() {
        AlmostWriter.play();
    }

    dump = function() {
        AlmostWriter.dump();
    }
})