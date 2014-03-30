$(document).ready(function () {
    // prepare the data
var source =
{
    datatype: "json",
    root: 'Rows',
    url: 'nedvizimost',
    cache: false,
    sortcolumn: 'date',
    sortdirection: 'desc',
    datafields: [
        { name: 'new', type: 'int'},
        { name: 'date', type: 'date'},
        { name: 'name', type: 'string'},
        { name: 'category', type: 'string'},
        { name: 'typeobyavl', type: 'string'},
        { name: 'raion', type: 'string'},
        { name: 'address', type: 'string'},
        { name: 'etaz', type: 'int'},
        { name: 'etazost', type: 'int'},
        { name: 'plosh', type: 'int'},
        { name: 'price', type: 'int'},
        { name: 'photos', type: 'string'},
        { name: 'contact', type: 'int'},

        { name: 'ids', type: 'int'},

        { name: 'zilaya', type: 'int'},
        { name: 'kuhnya', type: 'int'},
        { name: 'marketType', type: 'string'},
        { name: 'komnat', type: 'string'},
        { name: 'houseType', type: 'string'},
        { name: 'leaseType', type: 'string'},
        { name: 'persname', type: 'string'},
        { name: 'contname', type: 'string'},
        { name: 'agent', type: 'string'},
        { name: 'address', type: 'string'},
        { name: 'text', type: 'string'},
        { name: 'time', type: 'string'}


    ],


    filter: function()
        {
            // update the grid and send a request to the server.
            $("#jqxgrid").jqxGrid('updatebounddata', 'filter');
        },
    sort: function()
        {
            // update the grid and send a request to the server.
            $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
        },
    beforeprocessing: function(data)
        {

            if (data != null)
            {
                source.totalrecords = data[0].TotalRows;
            }
        }
};


var initrowdetails = function (index, parentElement, gridElement, datarecord) {
        var tabsdiv = null;
        var information = null;
        var notes = null;
        tabsdiv = $($(parentElement).children()[0]);
        if (tabsdiv != null) {
            /*
            $.each(tabsdiv[0], function(key, element) {
                alert('key: ' + key + '\n' + 'value: ' + element);
            });
            */
           //    $('li:contains("Notes")').text("Описание:");
            information = tabsdiv.find('.information');
            notes = tabsdiv.find('.notes');
            var title = tabsdiv.find('.title');
            title.text("Детали:");
            var container = $('<div style="margin: 5px;"></div>');
            container.appendTo($(information));
            var photocolumn = $('<div style="float: left; width: 15%;"></div>');
            var leftcolumn = $('<div style="float: left; width: 45%;"></div>');
            var rightcolumn = $('<div style="float: left; width: 40%;"></div>');
            container.append(photocolumn);
            container.append(leftcolumn);
            container.append(rightcolumn);

            //alert(datarecord.photos);
            var photo = $("<div class='jqx-rc-all' style='margin: 10px;'><b>Фото:</b></div>");


            if(datarecord.photos){

                var singlePhotoArr = datarecord.photos.split(', ');

                var image = "";
                var img = "";
                var vsego = "";

                /*
                image = $("<div style='margin-top: 10px;'></div>");
                img = $('<img height="60" src="' + singlePhotoArr[0] + '"/>');
                vsego = $('<p style="margin-top: 10px;">Всего ' + singlePhotoArr.length + ' фото</p>');

                image.append(img);
                image.append(vsego);
                image.appendTo(photo);

                */

                $.each(singlePhotoArr, function(key, imgurl) {

                   if (key === 0) {

                    image = $("<div style='margin-top: 10px;'></div>");
                    img = $('<a href="' + imgurl + '" class="boxer boxer_image" data-gallery="gallery' + datarecord.ids + '"><img height="60"  alt="Thumbnail" src="' + imgurl + '"/></a>');
                    vsego = $('<p style="margin-top: 10px;">Всего ' + singlePhotoArr.length + ' фото</p>');
                    image.append(img);
                    image.append(vsego);
                    image.appendTo(photo);

                      // alert("1" + key);

                   } else {

                       image = $("<div style='display:none;'></div>");
                       img = $('<a href="' + imgurl + '" class="boxer boxer_image"  data-gallery="gallery' + datarecord.ids + '"><img height="60"  alt="Thumbnail" src="' + imgurl + '"/></a>');
                       image.append(img);
                       image.appendTo(photo);
                      // alert("2" + key);
                   }


                });

                photocolumn.append(photo);
                $(".boxer").boxer("destroy");
                $(".boxer").boxer();


            } else {
                photocolumn.append(photo);
                photocolumn.append('<p style="margin: 10px;">Без фото</p>');
            }


            //alert("pers111 " + datarecord.persname);

            var persname, contname, agent, address = "";

            if(datarecord.persname){
                var persname = "<div style='margin-top: 10px;'><b>Продавец:</b> " + datarecord.persname + "</div>";
            }
            if(datarecord.contname){
                var contname = "<div style='margin-top: 10px;'><b>Имя:</b> " + datarecord.contname + "</div>";
            }
            if(datarecord.agent){
                var agent = "<div style='margin-top: 10px;'><b>Агентство:</b> " + datarecord.agent + "</div>";
            }
            if(datarecord.address){
                var address = "<div style='margin-top: 10px;'><b>Адрес:</b> " + datarecord.address + "</div>";
            }

            $(leftcolumn).append(persname);
            $(leftcolumn).append(contname);
            $(leftcolumn).append(agent);
            $(leftcolumn).append(address);

            var zilaya, kuhnya, marketType, komnat, houseType, leaseType, time  = "";

            if(datarecord.time){
                var time = "<div style='margin-top: 10px;'><b>Время публикации:</b> " + datarecord.time + "</div>";
            }

            if(datarecord.zilaya){
                zilaya = "<div style='margin-top: 10px;'><b>Жилая площадь:</b> " + datarecord.zilaya + "</div>";
            }

            if(datarecord.kuhnya){
                kuhnya = "<div style='margin-top: 10px;'><b>Площадь кухни:</b> " + datarecord.kuhnya + "</div>";
            }

            if(datarecord.marketType){
                marketType = "<div style='margin-top: 10px;'><b>Тип рынка:</b> " + datarecord.marketType + "</div>";
            }

            if(datarecord.komnat){
                komnat = "<div style='margin-top: 10px;'><b>Число комнат:</b> " + datarecord.komnat + "</div>";
            }

            if(datarecord.houseType){
                houseType = "<div style='margin-top: 10px;'><b>Тип дома:</b> " + datarecord.houseType + "</div>";
            }

            if(datarecord.leaseType){
                leaseType = "<div style='margin-top: 10px;'><b>Срок аренды:</b> " + datarecord.leaseType + "</div>";
            }


            $(rightcolumn).append(time);
            $(rightcolumn).append(zilaya);
            $(rightcolumn).append(kuhnya);
            $(rightcolumn).append(komnat);
            $(rightcolumn).append(marketType);
            $(rightcolumn).append(houseType);
            $(rightcolumn).append(leaseType);
            var notescontainer = $('<div style="white-space: normal; margin: 5px;"><span>' + datarecord.text + '</span></div>');
            $(notes).append(notescontainer);
            $(tabsdiv).jqxTabs({ width: 1050, height: 170});
        }
}



var dataadapter = new $.jqx.dataAdapter(source, {
    loadComplete: function (data) {

        var datainformation = $("#jqxgrid").jqxGrid('getdatainformation');
        for (i = 0; i < datainformation.rowscount; i++) {
            // Установка первого открытого
            var hidden = i > 0 ? true : true;
            $("#jqxgrid").jqxGrid('setrowdetails', i, "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'></li><li>Описание:</li></ul><div class='information'></div><div class='notes'></div></div>", 220, hidden);
        }

    },
    loadError: function(xhr, status, error)
    {
    alert(error);
    }
});




var getLocalization = function () {
        var localizationobj = {};

        localizationobj.pagergotopagestring = "Перейти на страницу №:";
        localizationobj.pagershowrowsstring = "Рядов:";
        localizationobj.pagerrangestring = " из ";
        localizationobj.pagerpreviousbuttonstring = "назад";
        localizationobj.pagernextbuttonstring = "вперед";
        localizationobj.groupsheaderstring = "Перетяните колонку и отпустите здесь для группировки по этой колонке";
        localizationobj.sortascendingstring = "Сортировка по возрастанию";
        localizationobj.sortdescendingstring = "Сортировка по убыванию";
        localizationobj.sortremovestring = "Убрать сортировку";
        localizationobj.groupbystring = "Группировать по этой колонке";
        localizationobj.groupremovestring = "Удалить из групп";
        localizationobj.filterclearstring = "Очистить";
        localizationobj.filterstring = "Фильтр";
        localizationobj.filtershowrowstring = "Показать записи где:";
        localizationobj.filterorconditionstring = "Или";
        localizationobj.filterandconditionstring = "И";
        localizationobj.filterselectallstring = "(Выбрать все)";
        localizationobj.filterchoosestring = "Выбрать:";
        localizationobj.filterstringcomparisonoperators = ['пустой', 'не пустой', 'содержит', 'содержит (учесть регистр)',
                'не содержит', 'не содержит (учесть регистр)', 'начинается с', 'начинается с (учесть регистр)',
                'заканчивается на', 'заканчивается на (учесть регистр)', 'равно', 'равно (учесть регистр)', 'не установлено', 'установлено'];
        localizationobj.filternumericcomparisonoperators = ['равно', 'не равно', 'меньше чем', 'меньше или равно', 'больше чем', 'больше или равно', 'не установлено', 'установлено'];
        localizationobj.filterdatecomparisonoperators = ['равно', 'не равно', 'меньше чем', 'меньше или равно', 'больше чем', 'больше или равно', 'не установлено', 'установлено'];
        localizationobj.filterbooleancomparisonoperators = ['равно', 'не равно'];
        localizationobj.validationstring = "Значение не подходит";
        localizationobj.emptydatastring = "Нет данных";
        localizationobj.filterselectstring = "Выбрать фильтр";
        localizationobj.loadtext = "Загрузка...";
        localizationobj.clearstring = "Очистить";
        localizationobj.todaystring = "Сегодня";
        localizationobj.currencysymbol = " Руб.";
        localizationobj.currencysymbolposition = "after";
        localizationobj.thousandsseparator = " ";

        localizationobj.firstDay = 0;
        var days =  {
        // full day names
        names: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            // abbreviated day names
        namesAbbr: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            // shortest day names
        namesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
        };
        localizationobj.days = days;

        var months = {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],
        // abbreviated month names
        namesAbbr: ["Янв", "Фев", "Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек", ""]
        };
        localizationobj.months = months;

        var patterns = {
            // short date pattern
            d: "dd/MM/yyyy",
            // long date pattern
            D: "dddd, dd MMMM, yyyy",
            // short time pattern
            t: "h:mm tt",
            // long time pattern
            T: "h:mm:ss tt",
            // long date, short time pattern
            f: "dddd, dd MMMM, yyyy h:mm tt",
            // long date, long time pattern
            F: "dddd, dd MMMM, yyyy h:mm:ss tt",
            // month/day pattern
            M: "dd MMMM",
            // month/year pattern
            Y: "MMMM yyyy",
            // S is a sortable format that does not vary by culture
            S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
        };
        localizationobj.patterns = patterns;

    return localizationobj;
}


// builds and applies the filter.
var applyFilter = function (dataFields, dataValues) {

   // Убрать автоочистку
   // Очистка фильтров приводит к ошибке bindingcomplete
   // $("#jqxgrid").jqxGrid('clearfilters');
   // $("#jqxgrid").bind("bindingcomplete", function (event) { // After binding

       var filtertype = 'stringfilter';
       var filtercondition = 'contains';

   // alert(dataValues[0]);

        if (dataFields.length == 1) {

            var datafield = dataFields[0];
            var filtervalue = dataValues[0];


            //Если цена
            if(datafield == "price"){
                var filtergroup = new $.jqx.filter();
                var priceAr = filtervalue.split("/");
                for (var n = 0; n < priceAr.length; n++) {
                    filtervalue = priceAr[n];
                    var filter_or_operator = 0;
                    if (n == 0){
                        filtercondition = "greater_than_or_equal";
                    } else {
                        filtercondition = "less_than_or_equal";
                    }
                    var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                }
                //Если площадь
            } else if(datafield == "plosh"){
                var filtergroup = new $.jqx.filter();
                var ploshAr = filtervalue.split("/");


                for (var n = 0; n < ploshAr.length; n++) {
                    filtervalue = ploshAr[n];

                    var filter_or_operator = 0;
                    if (n == 0){
                        filtercondition = "greater_than_or_equal";
                    } else {
                        filtercondition = "less_than_or_equal";
                    }

                    var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                }
                // Если комнаты
            } else if(datafield == "komnat" && filtervalue == "Многокомнатные"){
                var filtergroup = new $.jqx.filter();
                var notContValues = ["Студии","1","2","3", " "];
                for (var n = 0; n < notContValues.length; n++) {
                    filtervalue = notContValues[n];
                    var filter_or_operator = 0;
                        if (filtervalue == " "){
                            filtercondition = "not_empty";
                        } else {
                            filtercondition = "does_not_contain";
                        }
                    var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                }

            } else {
                if (datafield == 'date') {
                    //filtertype = 'datefilter';
                   // filtercondition = "greater_than_or_equal";
                    filtercondition = "greater_than";
                }
                if (datafield == 'contact' || datafield == 'zilaya' || datafield == 'kuhnya' ||datafield == 'price' || datafield == 'new' || datafield == 'etaz' || datafield == 'etazost' || datafield == 'plosh' || datafield == 'price') { filtertype = 'numericfilter'; filtercondition = "equal"; }
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 0;
                var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);

            }

            // add the filters.
            $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);

        } else {
            for (var i = 0; i < dataFields.length; i++) {
                var datafield = dataFields[i];
                var filtervalue = dataValues[i];


                //Если цена
                if(datafield == "price"){
                    var filtergroup = new $.jqx.filter();
                    var priceAr = filtervalue.split("/");
                    for (var n = 0; n < priceAr.length; n++) {
                        filtervalue = priceAr[n];
                        var filter_or_operator = 0;
                        if (n == 0){
                            filtercondition = "greater_than_or_equal";
                        } else {
                            filtercondition = "less_than_or_equal";
                        }
                        var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                        filtergroup.addfilter(filter_or_operator, filter);
                    }
                    //Если площадь
                } else if(datafield == "plosh"){
                    var filtergroup = new $.jqx.filter();
                    var ploshAr = filtervalue.split("/");
                    for (var n = 0; n < ploshAr.length; n++) {
                        filtervalue = ploshAr[n];
                        var filter_or_operator = 0;
                        if (n == 0){
                            filtercondition = "greater_than_or_equal";
                        } else {
                            filtercondition = "less_than_or_equal";
                        }
                        var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                        filtergroup.addfilter(filter_or_operator, filter);
                    }
                    // Если комнаты
                } else if(datafield == "komnat" && filtervalue == "Многокомнатные"){
                    var filtergroup = new $.jqx.filter();
                    var notContValues = ["Студии","1","2","3", " "];
                        for (var n = 0; n < notContValues.length - 1; n++) {
                            filtervalue = notContValues[n];
                            var filter_or_operator = 0;
                                if (filtervalue == " "){
                                    filtercondition = "not_empty";
                                } else {
                                    filtercondition = "does_not_contain";
                                }
                            var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                            filtergroup.addfilter(filter_or_operator, filter);
                        }
                } else {

                    if (datafield == 'date') {
                        //filtertype = 'datefilter';
                        filtercondition = "greater_than";
                    }
                    if (datafield == 'contact' || datafield == 'zilaya' || datafield == 'kuhnya' ||datafield == 'price' || datafield == 'new' || datafield == 'etaz' || datafield == 'etazost' || datafield == 'plosh' || datafield == 'price') { filtertype = 'numericfilter'; filtercondition = "equal"; }
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 0;
                    var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                    filtergroup.addfilter(filter_or_operator, filter);
                }
                // add the filters.
                $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);

            }
        }


        // apply the filters.
        $("#jqxgrid").jqxGrid('applyfilters');

   // Убрать автоочистку
   //$("#jqxgrid").unbind("bindingcomplete");
   //});


}


// builds and applies the filter.
var quickFilter = function (datafield, datavalue) {
    var filtertype = 'stringfilter';
    var filtercondition = 'contains';
    var filtervalue = datavalue;
    var filtergroup = new $.jqx.filter();
    var filter_or_operator = 0;

    if(datafield == "new"){
        filtercondition = 'equal';
    }

    if(datafield == "contact"){
        filtercondition = 'equal';
    }


    var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
    filtergroup.addfilter(filter_or_operator, filter);
    $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
    $("#jqxgrid").jqxGrid('applyfilters');
}

//
$("#tolkoSPhoto").click(function () {

    var datafield = "photos";
    var datavalue = "http";
    var button = $("#tolkoSPhoto");
    var myClass = button.attr("class");

    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});


$("#tolkoNew").click(function () {

        var datafield = "new";
        var datavalue = 1;
        var button = $("#tolkoNew");
        var myClass = button.attr("class");

        if (myClass == "btn btn-primary") {
            button.addClass("btn-success");
            quickFilter(datafield, datavalue);
        } else {
            button.removeClass("btn-success");
            $("#jqxgrid").jqxGrid('removefilter', datafield);
            $("#jqxgrid").jqxGrid('applyfilters');
        }

});


$("#prodayu").click(function () {

    var datafield = "typeobyavl";
    var datavalue = "Продам";
    var button = $("#prodayu");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#snimu").attr("class") == "btn btn-primary btn-success") {
        $("#snimu").removeClass("btn-success");
    }

    if ($("#kuplyu").attr("class") == "btn btn-primary btn-success") {
        $("#kuplyu").removeClass("btn-success");
    }

    if ($("#sdayu").attr("class") == "btn btn-primary btn-success") {
        $("#sdayu").removeClass("btn-success");
    }

    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});

$("#sdayu").click(function () {

    var datafield = "typeobyavl";
    var datavalue = "Сдам";
    var button = $("#sdayu");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#snimu").attr("class") == "btn btn-primary btn-success") {
        $("#snimu").removeClass("btn-success");
    }

    if ($("#kuplyu").attr("class") == "btn btn-primary btn-success") {
        $("#kuplyu").removeClass("btn-success");
    }

    if ($("#prodayu").attr("class") == "btn btn-primary btn-success") {
        $("#prodayu").removeClass("btn-success");
    }

    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});

$("#kuplyu").click(function () {

    var datafield = "typeobyavl";
    var datavalue = "Куплю";
    var button = $("#kuplyu");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#snimu").attr("class") == "btn btn-primary btn-success") {
        $("#snimu").removeClass("btn-success");
    }

    if ($("#sdayu").attr("class") == "btn btn-primary btn-success") {
        $("#sdayu").removeClass("btn-success");
    }

    if ($("#prodayu").attr("class") == "btn btn-primary btn-success") {
        $("#prodayu").removeClass("btn-success");
    }


    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});

$("#snimu").click(function () {

    var datafield = "typeobyavl";
    var datavalue = "Сниму";
    var button = $("#snimu");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#kuplyu").attr("class") == "btn btn-primary btn-success") {
        $("#kuplyu").removeClass("btn-success");
    }

    if ($("#sdayu").attr("class") == "btn btn-primary btn-success") {
        $("#sdayu").removeClass("btn-success");
    }

    if ($("#prodayu").attr("class") == "btn btn-primary btn-success") {
        $("#prodayu").removeClass("btn-success");
    }

    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});


$("#novostroi").click(function () {

    var datafield = "marketType";
    var datavalue = "Новостро";
    var button = $("#novostroi");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#vtorichka").attr("class") == "btn btn-primary btn-success") {
        $("#vtorichka").removeClass("btn-success");
    }

    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});


$("#vtorichka").click(function () {

    var datafield = "marketType";
    var datavalue = "Вторич";
    var button = $("#vtorichka");
    var myClass = button.attr("class");

    // Убрать взаимоисключающие фильтры на одно поле - один фильтр (два при сложных)
    if ($("#novostroi").attr("class") == "btn btn-primary btn-success") {
        $("#novostroi").removeClass("btn-success");
    }


    if (myClass == "btn btn-primary") {
        button.addClass("btn-success");
        quickFilter(datafield, datavalue);
    } else {
        button.removeClass("btn-success");
        $("#jqxgrid").jqxGrid('removefilter', datafield);
        $("#jqxgrid").jqxGrid('applyfilters');
    }

});



$("#ubratAgentov").click(function () {

        var datafield = "contact";
        var datavalue = "5";
        var button = $("#ubratAgentov");
        var myClass = button.attr("class");

        if (myClass == "btn btn-primary") {
            button.addClass("btn-success");
            quickFilter(datafield, datavalue);
        } else {
            button.removeClass("btn-success");
            $("#jqxgrid").jqxGrid('removefilter', datafield);
            $("#jqxgrid").jqxGrid('applyfilters');
        }

});



// clears the filter.
$("#clearFilters").click(function () {
    $("#jqxgrid").jqxGrid('clearfilters');
    $('#cityNames').val('');
    $('#cityRaions').val('');
    $('#category').val('');
    $('#komnat').val('');
    $('#period').val('');
    $('#plosh').val('');
    $('#price').val('');

    // Очистка быстрых тоже
    $("#tolkoNew").removeClass("btn-success");
    $("#tolkoSPhoto").removeClass("btn-success");
    $("#prodayu").removeClass("btn-success");
    $("#sdayu").removeClass("btn-success");
    $("#kuplyu").removeClass("btn-success");
    $("#snimu").removeClass("btn-success");
    $("#novostroi").removeClass("btn-success");
    $("#vtorichka").removeClass("btn-success");

});



// applies the filter.
$("#applyFilters").click(function () {

    var dataFields = [];
    var dataValues = [];

    var citySelect = $("#cityNames").val();
    if(citySelect != ""){
       // alert(citySelect);
        dataFields.push("name");
        dataValues.push(citySelect);
    }

    var cityRaions = $("#cityRaions").val();
    if(cityRaions != ""){
        dataFields.push("raion");
        dataValues.push(cityRaions);
    }

    var category = $("#category").val();
    if(category != ""){
        dataFields.push("category");
        dataValues.push(category);
    }

    var komnat = $("#komnat").val();
    if(komnat != ""){
        dataFields.push("komnat");
        dataValues.push(komnat);
    }

    var period = $("#period").val();
    if(period != ""){
       // period: [ "1 день", "2 дня", "3 дня", "Неделя", "2 недели", "3 недели", "Месяц", "Текущий год" ],
       var today = new Date();
       var offset = 0;
        switch(period)
        {
            case "1 день":
                offset = 1;
                break;
            case "2 дня":
                offset = 2;
                break;
            case "3 дня":
                offset = 3;
                break;
            case "Неделя":
                offset = 7;
                break;
            case "2 недели":
                offset = 14;
                break;
            case "3 недели":
                offset = 21;
                break;
            case "Месяц":
                offset = 31;
                break;
            case "Текущий год":
                offset = 365;
                break;
        }
        today.setDate(today.getDate() - offset);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(mm<10) {
            mm='0'+mm;
        }
        period = dd+"/"+mm+"/"+yyyy;
       // alert(period);
        dataFields.push("date");
        dataValues.push(period);
    }

    //plosh: [ "0 - 30 м²", "30 - 70 м²", "70 - 100 м²", "100 - 200 м²", "200 и больше" ],
    var plosh = $("#plosh").val();
    if(plosh != ""){
        switch(plosh)
        {
            case "0 - 30 м²":
                plosh = "1/30";
                break;
            case "30 - 70 м²":
                plosh = "30/70";
                break;
            case "70 - 100 м²":
                plosh = "70/100";
                break;
            case "100 - 200 м²":
                plosh = "100/200";
                break;
            case "200 и больше":
                plosh = "200/100000000000000";
                break;
        }


        dataFields.push("plosh");
        dataValues.push(plosh);
    }

    //price: [ "0 - 300 т. руб.", "300 - 700 т. руб.", "700 т. - 1.5 млн. руб.", "1.5 - 3 млн. руб.", "3 млн. и больше" ]
    var price = $("#price").val();
    if(price != ""){
        switch(price)
        {
            case "0 - 300 т. руб.":
                price = "1/300000";
                break;
            case "300 - 700 т. руб.":
                price = "300000/700000";
                break;
            case "700 т. - 1.5 млн. руб.":
                price = "700000/1500000";
                break;
            case "1.5 - 3 млн. руб.":
                price = "1500000/3000000";
                break;
            case "3 млн. и больше":
                price = "3000000/1000000000000000000000000000000";
                break;
        }


        dataFields.push("price");
        dataValues.push(price);
    }




    if(dataFields.length > 0) applyFilter(dataFields, dataValues);

});


var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        if (value < 1) {
            return '<span></span>';
        }
        else {
            //newstarred.png
            return '<div style="background-image:url(\'/images/iconnew.png\'); margin-left: 16px; margin-top: 4px; height: 17px; width: 29px; float: ' + columnproperties.cellsalign + '; "></div>';
        }
}

// initialize jqxGrid
$("#jqxgrid").jqxGrid(
            {
                //width: 1140,
                width: "100%",
                theme: 'energyblue',
                source: dataadapter,
                pagesizeoptions: ['10', '30', '60'],
                filterable: true,
                sortable: true,
                autoheight: true,
                pageable: true,
                columnsresize: true,
                //
                enablehover: true,
                enablebrowserselection: true,
                selectionmode: 'none',
                //
                showfilterrow: false,
                //autoshowfiltericon: true,
                virtualmode: true,
                localization: getLocalization(),
                rowdetails: true,
                rowdetailstemplate: { rowdetails: "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'></li><li>Описание:</li></ul><div class='information'></div><div class='notes'></div></div>", rowdetailsheight: 200 },

                /*
                ready: function () {
                    addfilter();
                },
                */
                /*
                ready: function () {
                    $("#jqxgrid").jqxGrid('showrowdetails', 0);
                },
                */

                initrowdetails: initrowdetails,
                rendergridrows: function(obj)
                {
                return obj.data;
                },

                columns: [
                        { text: 'Новое', datafield: 'new', width: 60, cellsalign: 'center', cellsrenderer: cellsrenderer },
                        { text: 'Добавлено', datafield: 'date', width: 100, cellsformat: 'd' },
                        { text: 'Город', datafield: 'name', width: 100 },
                        { text: 'Объект', datafield: 'category', width: 100 },
                        { text: 'Тип сделки', datafield: 'typeobyavl', width: 100 },
                        { text: 'Район', datafield: 'raion', width: 89 },
                        { text: 'Адрес', datafield: 'address', width: 150 },
                        { text: 'Этаж', datafield: 'etaz', width: 50 },
                        { text: 'Эт-ть', datafield: 'etazost', width: 50 },
                        { text: 'Площадь', datafield: 'plosh', width: 70 },
                        { text: 'Цена', datafield: 'price', width: 140, cellsformat: 'c' },
                        { text: 'Телефон', datafield: 'contact', width: 100, filterable: false, sortable: false },
                        { text: 'Комнат', datafield: 'komnat', width: 90, hidden: true },   // , hidden: true
                        { text: 'Фото', datafield: 'photos', width: 90, hidden: true },
                        { text: 'Тип рынка', datafield: 'marketType', width: 90, hidden: true }
                        ]
});

    /*
    // set row details.
    $("#jqxgrid").jqxGrid('initrowdetails: initrowdetails');
    $("#jqxgrid").jqxGrid('setrowdetails', 0, "<div class='tabs0' style='margin: 10px;'><ul style='margin-left: 30px;'><li>Nancy Davolio</li><li>Notes</li></ul><div class='information0'></div><div class='notes0'></div></div>", 200, false);
    $("#jqxgrid").jqxGrid('resumeupdate');
    */


});