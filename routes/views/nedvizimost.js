var keystone = require('keystone'),
    moment = require('keystone/node_modules/moment');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);

    locals = res.locals;
    locals.data = {
        nedvCount: "",
        cityNames: [ "Орел", "Болхов", "Верховье", "Дмитровск", "Кромы", "Ливны", "Мценск", "Нарышкино", "Кромы", "Новосиль", "Хомутово", "Хотынец" ],
        cityRaions: [ "Заводской", "Железнодор.", "Советский", "Северный", "Знаменка" ],
        category: [ "Квартиры", "Комнаты", "Дома", "Участки", "Гаражи", "Коммерческая", "За рубежом" ],
        komnat: [ "Студии", "1", "2", "3", "Многокомнатные" ],
        period: [ "1 день", "2 дня", "3 дня", "Неделя", "2 недели", "3 недели", "Месяц", "Текущий год" ],
        plosh: [ "0 - 30 м²", "30 - 70 м²", "70 - 100 м²", "100 - 200 м²", "200 и больше" ],
        price: [ "0 - 300 т. руб.", "300 - 700 т. руб.", "700 т. - 1.5 млн. руб.", "1.5 - 3 млн. руб.", "3 млн. и больше" ],
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
                //res.end();
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
           var specialChars = "!@#$^&%*()+=[]\{}|:<>?";

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

                                case "EMPTY":


                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = "";
                                        //$and
                                    // или второе - пишем в тотже i что и предыдущий OR иначе пустые ячейки
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = "";
                                    // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = "";
                                    }

                                    
                                    break;

                                case "NOT_NULL":

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

                                case "NOT_EMPTY":

                                    // или первое
                                    if (filteroperator == 1 && tmpfilteroperator == 0){
                                        whereObj['$and'][i]['$or'][0][filterdatafield] = { $ne: "" };
                                        //$and
                                        // или второе
                                    } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                        var prev = i-1;
                                        whereObj['$and'][prev]['$or'][1][filterdatafield] = { $ne: "" };
                                        // обычное и
                                    } else {
                                        whereObj['$and'][i][filterdatafield] = { $ne: "" };
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

                                    if (filterdatafield == "date") {  // Иначе это дата

                                        var testAr =  filtervalue.split("/");
                                        // 0 - dd, 1 - mm, 2 - yyyyy
                                        //filtervalue = new Date(testAr[1]+"/"+testAr[0]+"/"+testAr[2]);
                                        //to moment 2014-03-22
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];

                                        var start = moment(filtervalue).startOf('day');
                                        var end = moment(filtervalue).endOf('day');
                                       // console.log("mom " + start.toDate());
                                        //filtervalue = filtervalue.toISOString();
                                        //filtervalue = parseInt(filtervalue.getTime());
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = {  $lte: end.toDate(), $gte: start.toDate()  };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $lte: end.toDate(), $gte: start.toDate() };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = {  $lte: end.toDate(), $gte: start.toDate() };
                                        }

                                    } else if (testNum == ""){
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



                                    if (filterdatafield == "date") {  // Иначе это дата
                                        // 2014-03-27T00:00:00Z
                                        // 2014-03-27T20:00:00.000Z
                                        //  var day = moment(filtervalue).startOf('day');

                                        var testAr =  filtervalue.split("/");
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];
                                        // Создать такуюже дату как в базе, т.е. без временной зоны
                                       var day = moment(filtervalue + "00:00 +0000", "YYYY-MM-DD HH:mm Z");

                                      //  filtervalue = new Date(testAr[1]+"/"+testAr[0]+"/"+testAr[2]);
                                        //var day = filtervalue.toISOString();

                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = {   $ne: day  };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = {  $ne: day };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = {  $ne: day };
                                        }


                                    } else if (testNum == ""){
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



                                    if (filterdatafield == "date") {  // Иначе это дата

                                        var testAr =  filtervalue.split("/");
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];
                                        // Создать такуюже дату как в базе, т.е. без временной зоны
                                        var filtervalue = moment(filtervalue + "00:00 +0000", "YYYY-MM-DD HH:mm Z");

                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $gt:  filtervalue };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $gt:   filtervalue  };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $gt:  filtervalue };
                                        }

                                    } else if (filteroperator == 1 && tmpfilteroperator == 0){
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

                                    
                                    break;
                                case "LESS_THAN":
                                    // Если число


                                    if (filterdatafield == "date") {  // Иначе это дата

                                        var testAr =  filtervalue.split("/");
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];
                                        // Создать такуюже дату как в базе, т.е. без временной зоны
                                        var filtervalue = moment(filtervalue + "00:00 +0000", "YYYY-MM-DD HH:mm Z");

                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $lt:  filtervalue };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $lt:   filtervalue  };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $lt:  filtervalue };
                                        }

                                    } else if (filteroperator == 1 && tmpfilteroperator == 0){
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

                                    
                                    break;
                                case "GREATER_THAN_OR_EQUAL":
                                    // Если число
                                    var testNum = filtervalue.replace(/\d/g, "");

                                    if (filterdatafield == "date") {  // Иначе это дата

                                        var testAr =  filtervalue.split("/");
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];
                                        // Создать такуюже дату как в базе, т.е. без временной зоны
                                        var filtervalue = moment(filtervalue + "00:00 +0000", "YYYY-MM-DD HH:mm Z");

                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $gte:  filtervalue };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $gte:   filtervalue  };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $gte:  filtervalue };
                                        }

                                    } else if (testNum == ""){
                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] =  { $gte: parseInt(filtervalue) };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $gte: parseInt(filtervalue) };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $gte: parseInt(filtervalue) };
                                        }
                                    }
                                    
                                    break;
                                case "LESS_THAN_OR_EQUAL":
                                    // Если число


                                    if (filterdatafield == "date") {  // Иначе это дата

                                        var testAr =  filtervalue.split("/");
                                        filtervalue = testAr[2]+"-"+testAr[1]+"-"+testAr[0];
                                        // Создать такуюже дату как в базе, т.е. без временной зоны
                                        var filtervalue = moment(filtervalue + "00:00 +0000", "YYYY-MM-DD HH:mm Z");

                                        // или первое
                                        if (filteroperator == 1 && tmpfilteroperator == 0){
                                            whereObj['$and'][i]['$or'][0][filterdatafield] = { $lte:  filtervalue };
                                            //$and
                                            // или второе
                                        } else if (filteroperator == 1 && tmpfilteroperator == 1) {
                                            var prev = i-1;
                                            whereObj['$and'][prev]['$or'][1][filterdatafield] = { $lte:   filtervalue  };
                                            // обычное и
                                        } else {
                                            whereObj['$and'][i][filterdatafield] = { $lte:  filtervalue };
                                        }

                                    } else if (filteroperator == 1 && tmpfilteroperator == 0){
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