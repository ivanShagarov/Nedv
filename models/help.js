var _ = require('underscore'),
    keystone = require('keystone'),
    Types = keystone.Field.Types;


//var Ned = new keystone.List('Nedvizimost');

var Hlp = new keystone.List('Help', {
    defaultSort: '-new',
    label: 'Помощь',
    singular: 'Помощь',
    plural: 'записи Помощи',
    path: 'help'   // Путь в УРЛЕ
    //  autokey: { from: 'id', path: 'id' }  // Тоже все ломает

});


Hlp.add({
    name: { type: String, required: true, label: "Название"  },
    text: { type: Types.Html, wysiwyg: true, required: true, label: "Текст" }
});



Hlp.defaultColumns = 'name, text';
Hlp.register();