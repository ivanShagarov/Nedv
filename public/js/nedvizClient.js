$(document).ready(function () {
    // prepare the data
var source =
{
    datatype: "json",
    root: 'Rows',
    url: 'nedvizimost',
    cache: false,
    sortcolumn: 'new',
    sortdirection: 'desc',
    datafields: [
        { name: 'new', type: 'string'},
        { name: 'date', type: 'date'},
        { name: 'name', type: 'string'},
        { name: 'category', type: 'string'},
        { name: 'typeobyavl', type: 'string'},
        { name: 'raion', type: 'string'},
        { name: 'address', type: 'string'},
        { name: 'etaz', type: 'string'},
        { name: 'etazost', type: 'string'},
        { name: 'plosh', type: 'string'},
        { name: 'price', type: 'float'},
        { name: 'contact', type: 'string'}
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

var dataadapter = new $.jqx.dataAdapter(source, {
    loadError: function(xhr, status, error)
    {
    alert(error);
    }
}


);

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
            d: "d/M/yyyy",
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
                rendergridrows: function(obj)
                {
                return obj.data;
                },
                columns: [
                        { text: 'Новое', datafield: 'new', width: 60 },
                        { text: 'Добавлено', datafield: 'date', width: 100, cellsformat: 'd' },
                        { text: 'Город', datafield: 'name', width: 100 },
                        { text: 'Объект', datafield: 'category', width: 100 },
                        { text: 'Тип сделки', datafield: 'typeobyavl', width: 100 },
                        { text: 'Район', datafield: 'raion', width: 100 },
                        { text: 'Адрес', datafield: 'address', width: 150 },
                        { text: 'Этаж', datafield: 'etaz', width: 50 },
                        { text: 'Этажность', datafield: 'etazost', width: 70 },
                        { text: 'Площадь', datafield: 'plosh', width: 70 },
                        { text: 'Цена', datafield: 'price', width: 140, cellsformat: 'c2' },
                        { text: 'Телефон', datafield: 'contact', width: 100 }
                        ]
});



$("#jqxgrid").jqxGrid('localizestrings', localizationobj);



});