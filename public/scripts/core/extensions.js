/**
 * Simplify the template functionality of underscore
 */
if (_.template !== undefined) {
    _.tmpl = function(sel, opt) {
        var template = $(sel).html();
        return _.template(template, opt);
    };
}
