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

    // Load records for grid
    view.on('init', function(next) {

        if (req.query.pagesize) {

           var totalRows, greater, less, skip, limit = 0;
           var sortdatafield, sortorder, dataJson = "";
           var sortObj = {};

            keystone.list('Nedvizimost').model.count().exec(function(err, count) {

                totalRows = count;

                //less = totalRows - ( req.query.pagesize * req.query.pagenum );
                //greater = totalRows - ( ( req.query.pagesize * req.query.pagenum ) + req.query.pagesize );

                skip = req.query.pagesize * req.query.pagenum;
                limit = ( ( req.query.pagesize * req.query.pagenum ) + req.query.pagesize );

                sortdatafield = req.query.sortdatafield;
                sortorder = req.query.sortorder;

                sortObj[sortdatafield] = sortorder;

                /*
                db.collection.update({"ID":"sample"},{"$set":{"Item.Possess.Jewel.1":888})
                var set = {$set: {}};
                set.$set["Item.Possess.Jewel." + temp] = 888;
                db.collection.update({"ID":"sample"}, set);
                */

                console.log("sortorder " + sortorder);

                if(sortorder != ""){
                    keystone.list('Nedvizimost').model.find({}).sort(sortObj).skip(skip).limit(limit).exec(function (err, data) {
                       return res.json(200, [ {TotalRows: totalRows}, { Rows: data } ]);
                       res.end();

                    });
                } else {
                    keystone.list('Nedvizimost').model.find({}).skip(skip).limit(limit).exec(function (err, data) {
                        return res.json(200, [ {TotalRows: totalRows}, { Rows: data } ]);
                        res.end();

                    });
                }


            });



        } else {
            next();
        }

    });

/*
    $data[] = array(
        'TotalRows' => $total_rows,
        'Rows' => $orders
    );


    [{
        "id": "1",
        "name": "Hot Chocolate",
        "type": "Chocolate Beverage",
        "calories": "370",
        "totalfat": "16g",
        "protein": "14g"
    }, {
        "id": 2,
        "name": "Peppermint Hot Chocolate",
        "type": "Chocolate Beverage",
        "calories": "440",
        "totalfat": "16g",
        "protein": "13g"
    }, {

*/




    view.query('nedvizimost', keystone.list('Nedvizimost').model.find().sort('sortOrder'));
    view.render('nedvizimost');


};