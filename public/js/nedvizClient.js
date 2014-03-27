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
        { name: 'etaz', type: 'string'},
        { name: 'etazost', type: 'string'},
        { name: 'plosh', type: 'string'},
        { name: 'price', type: 'int'},
        { name: 'photos', type: 'string'},
        { name: 'contact', type: 'int'},

        { name: 'ids', type: 'int'},

        { name: 'zilaya', type: 'int'},
        { name: 'kuhnya', type: 'int'},
        { name: 'marketType', type: 'string'},
        { name: 'komnat', type: 'int'},
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



var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        if (value < 1) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #0000ff;">' + value + '</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
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
                virtualmode: true,
                localization: getLocalization(),
                rowdetails: true,
                rowdetailstemplate: { rowdetails: "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'></li><li>Описание:</li></ul><div class='information'></div><div class='notes'></div></div>", rowdetailsheight: 200 },
                ready: function () {
                    $("#jqxgrid").jqxGrid('showrowdetails', 0);
                },
                initrowdetails: initrowdetails,
                rendergridrows: function(obj)
                {
                return obj.data;
                },
                columns: [
                        { text: 'Новое', datafield: 'new', width: 60, cellsalign: 'right', cellsrenderer: cellsrenderer },
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
                        { text: 'Телефон', datafield: 'contact', width: 100 }
                        ]
});







});