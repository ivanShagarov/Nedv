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

           var totalRows, greater, less, skip, limit, filterscount, filteroperator = 0;
           var sortdatafield, sortorder, dataJson, filtercondition, filterdatafield, filtervalue, whereString, tmpdatafield, tmpfilteroperator  = "";
           var sortObj = {};
           var whereObj = {};
           var specialChars = "!@#$^&%*()+=[]\/{}|:<>?";

            keystone.list('Nedvizimost').model.count().exec(function(err, count) {

                totalRows = count;

                //less = totalRows - ( req.query.pagesize * req.query.pagenum );
                //greater = totalRows - ( ( req.query.pagesize * req.query.pagenum ) + req.query.pagesize );

                skip = req.query.pagesize * req.query.pagenum;
                limit = ( ( req.query.pagesize * req.query.pagenum ) + req.query.pagesize );


                filterscount = req.query.filterscount;

                if (filterscount != "") {
                    if (filterscount > 0) {

                        whereObj['$and'] = [];

                        tmpdatafield = "";
                        tmpfilteroperator = 0;

                        for (var i = 0; i < filterscount; i++) {

                            filtercondition = req.query['filtercondition' + i];
                            filterdatafield = req.query['filterdatafield' + i];
                            filtervalue = req.query['filtervalue' + i];
                            filteroperator = req.query['filteroperator' + i];

                            console.log("filterscount " + filterscount);
                            console.log("filtercondition " + filtercondition);
                            console.log("filterdatafield " + filterdatafield);
                            console.log("filtervalue " + filtervalue);
                            console.log("filteroperator " + filteroperator);
                            console.log("tmpdatafield " + tmpdatafield);
                            console.log("tmpfilteroperator " + tmpfilteroperator);

                            if(filtervalue){
                                for (var it = 0; it < specialChars.length; it++) {
                                    filtervalue = filtervalue.replace(new RegExp("\\" + specialChars[it], 'gi'), '');
                                }
                            }

                            whereObj['$and'][i] = {};

                            // Если начало оператора ИЛИ
                            if (filteroperator == 1 && tmpfilteroperator == 0){
                                if(whereObj['$and'][i]['$or'] == undefined){

                                    whereObj['$and'][i]['$or'] = [];
                                    whereObj['$and'][i]['$or'][0] = {};
                                    whereObj['$and'][i]['$or'][1] = {};

                                }
                            }

                            // build the "WHERE" clause depending on the filter's condition, value and datafield.
                            switch(filtercondition)
                            {
                                case "NULL":
                                case "EMPTY":
                                    //whereString += '"' + filterdatafield + '": { "$exists": "false" }';
                                  // whereString += filterdatafield + ': "{ $exists: false }"';
                                   // whereObj[filterdatafield] = { $exists: false };

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $exists: false };
                                        //$and
                                    // или второе - пишем в тотже i что и предыдущий OR иначе пустые ячейки
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $exists: false };
                                    // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $exists: false };
                                    }

                                    
                                    break;
                                case "NOT_NULL":
                                case "NOT_EMPTY":

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $exists: true };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $exists: true };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $exists: true };
                                    }
                                    
                                    break;
                                case "STARTS_WITH_CASE_SENSITIVE":

                                    var regexpObj = new RegExp('^ ?'+filtervalue);

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj };
                                    }

                                     // Option i - case insensitive
                                    //field: { $regex: 'acme.*corp', $options: 'i' }
                                   // name: new RegExp(search)

                                    
                                    break;
                                case "ENDS_WITH_CASE_SENSITIVE":
                                  //  (.+my)$

                                    var regexpObj = new RegExp('(.+' + filtervalue + ' ?)$');

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj };
                                    }
                                    
                                    break;
                                case "CONTAINS_CASE_SENSITIVE":
                                    //  (.+my)$

                                    var regexpObj = new RegExp('(.*' + filtervalue + '.*)');

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj };
                                    }
                                    
                                    break;
                                case "DOES_NOT_CONTAIN_CASE_SENSITIVE":

                                    // ^((?!hede).)*$
                                    var regexpObj = new RegExp('^((?!' + filtervalue + ').)*$');

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj };
                                    }
                                    
                                    break;
                                case "CONTAINS":
                                    var regexpObj = new RegExp('(.*' + filtervalue + '.*)');

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                    }
                                    
                                    break;
                                case "DOES_NOT_CONTAIN":
                                    var regexpObj = new RegExp('^((?!' + filtervalue + ').)*$');
                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                    }
                                    
                                    break;
                                case "EQUAL":

                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] =  parseInt(filtervalue);
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = parseInt(filtervalue);
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = parseInt(filtervalue);
                                        }
                                    } else {
                                        //^ *(my test data) *$
                                        var regexpObj = new RegExp('^ *(' + filtervalue + ') *$');
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        }
                                    }
                                    
                                    break;
                                case "NOT_EQUAL":

                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $ne: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $ne: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $ne: parseInt(filtervalue) };
                                        }
                                    } else {
                                        //^ *(my test data) *$
                                        var regexpObj = new RegExp('^((?!' + filtervalue + ').)*$');
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        }
                                    }
                                    
                                    break;

                                case "EQUAL_CASE_SENSITIVE":

                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] =  parseInt(filtervalue);
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = parseInt(filtervalue);
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = parseInt(filtervalue);
                                        }
                                    } else {
                                        //^ *(my test data) *$
                                        var regexpObj = new RegExp('^ *(' + filtervalue + ') *$');
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $regex: regexpObj };
                                        }
                                    }
                                    break;


                                case "GREATER_THAN":
                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $gt: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $gt: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $gt: parseInt(filtervalue) };
                                        }
                                    } else {
                                          // Для строк нет такой операции
                                    }
                                    
                                    break;
                                case "LESS_THAN":
                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $lt: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $lt: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $lt: parseInt(filtervalue) };
                                        }
                                    } else {
                                        // Для строк нет такой операции
                                    }
                                    
                                    break;
                                case "GREATER_THAN_OR_EQUAL":
                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $gte: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $gte: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $gte: parseInt(filtervalue) };
                                        }
                                    } else {
                                        // Для строк нет такой операции
                                    }
                                    
                                    break;
                                case "LESS_THAN_OR_EQUAL":
                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");
                                    if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $lte: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $lte: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $lte: parseInt(filtervalue) };
                                        }
                                    } else {
                                        // Для строк нет такой операции
                                    }
                                    
                                    break;
                                case "STARTS_WITH":
                                    var regexpObj = new RegExp('^ ?'+filtervalue);
                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                    }
                                    
                                    break;
                                case "ENDS_WITH":

                                    var regexpObj = new RegExp('(.+' + filtervalue + ' ?)$');
                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $regex: regexpObj, $options: 'i' };
                                    }
                                    
                                    break;
                            }



                            if (tmpdatafield == filterdatafield)
                            {

                            }

                            // Если конец оператора ИЛИ
                            if (filteroperator == 1 && tmpfilteroperator == 1){

                                tmpfilteroperator = 0;

                            } else {

                                tmpfilteroperator = filteroperator;
                            }


                            if (i == filterscount - 1)
                            {
                                whereString += " }";

                              //  console.log("whereString " + whereString);




                                //whereObj = JSON.parse(whereString);
                                //eval('whereObj='+whereString);
                               // whereObj = eval(whereString);

                              console.log("whereObj " + JSON.stringify(whereObj));

                            }


                            tmpdatafield = filterdatafield;




                        }
                    }
                }

                /*
                db.collection.update({"ID":"sample"},{"$set":{"Item.Possess.Jewel.1":888})
                var set = {$set: {}};
                set.$set["Item.Possess.Jewel." + temp] = 888;
                db.collection.update({"ID":"sample"}, set);
                */




                sortorder = req.query.sortorder;
                if(sortorder != ""){

                    sortdatafield = req.query.sortdatafield;
                    sortObj[sortdatafield] = sortorder;

                  //  whereObj[filterdatafield] =  { $exists: true };

                   // console.log("whereObj.2 " + whereObj[filterdatafield]["$exists"]);

                    keystone.list('Nedvizimost').model.find(whereObj).sort(sortObj).skip(skip).limit(limit).exec(function (err, data) {
                       return res.json(200, [ {TotalRows: totalRows}, { Rows: data } ]);
                       res.end();
                    });
                } else {
                    keystone.list('Nedvizimost').model.find(whereObj).skip(skip).limit(limit).exec(function (err, data) {
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