var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'help';

    // Render the view

    view.query('help', keystone.list('Help').model.find());



    view.render('help');
}
