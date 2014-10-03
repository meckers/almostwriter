if (_.template !== undefined) {
    _.tmpl = function(sel, opt) {
        var template = $(sel).html();
        return _.template(template, opt);
    };
}
else {
    console.log("oh no!");
}
