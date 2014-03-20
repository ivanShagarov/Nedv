var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);

    locals = res.locals;
    locals.data = {
        nedvCount: "",
        tags: []
    };

    // Set locals
    locals.section = 'nedvizimost';



    // Load the total amount of records
    view.on('init', function(next) {

        if (req.query.total) {
            keystone.list('Nedvizimost').model.count().exec(function(err, count) {
                locals.data.nedvCount = count;
                console.log("Total " + locals.data.nedvCount);
                return res.json(200, { status: 'OK', users: 0, Prods: "33" });
                next(err);
            });
        } else {
            next();
        }

    });




    view.query('nedvizimost', keystone.list('Nedvizimost').model.find().sort('sortOrder'));
    view.render('nedvizimost');


};