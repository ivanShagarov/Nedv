    var _ = require('underscore'),
    keystone = require('keystone'),
    Types = keystone.Field.Types;


//var Ned = new keystone.List('Nedvizimost');

var Ned = new keystone.List('Nedvizimost', {
    defaultSort: '-new',
    label: 'Недвижимость',
    singular: 'Недвижимость',
    plural: 'записи Недвижимости',
    path: 'nedvizimost'   // Путь в УРЛЕ
  //  autokey: { from: 'id', path: 'id' }  // Тоже все ломает

});


Ned.add({
    name: { type: String, required: true, label: "Город"  },
    ids: { type: Types.Number, index: true },      // id ломает все нахер!
    new: { type: Types.Number, initial: true, label: "Новая"   },
    category: { type: Types.Text, initial: true, label: "Категория"   },
    typeobyavl: { type: Types.Text, initial: true, label: "Тип объявления"   },
    raion: { type: Types.Text, initial: true, label: "Район"   },
    address: { type: Types.Text, initial: true, label: "Адрес"   },
    etaz: { type: Types.Number, initial: true, label: "Этаж"   },
    etazost: { type: Types.Number, initial: true, label: "Этажность"   },
    plosh: { type: Types.Number, initial: true, label: "Площадь"   },
    zilaya: { type: Types.Number, initial: true, label: "Жилая"   },
    kuhnya: { type: Types.Number, initial: true, label: "Кухня"   },
    price: { type: Types.Number, initial: true, label: "Цена"   },
    contact: { type: Types.Number, initial: true, label: "Телефон"   },
    date: { type: Types.Date, initial: true, label: "Дата"   },
    source: { type: Types.Text, initial: true, label: "Сайт"   },
    marketType: { type: Types.Text, initial: true, label: "Тип рынка"   },
    komnat: { type: Types.Text, initial: true, label: "Комнат"   },
    houseType: { type: Types.Text, initial: true, label: "Тип дома"   },
    leaseType: { type: Types.Text, initial: true, label: "Тип аренды"   },
    persname: { type: Types.Text, initial: true, label: "Продавец"   },
    contname: { type: Types.Text, initial: true, label: "Имя"   },
    photos: { type: Types.Text, initial: true, label: "Фото"   },
    text: { type: Types.Text, initial: true, label: "Описание"   },
    link: { type: Types.Text, initial: true, label: "Ссылка"   },
    time: { type: Types.Text, initial: true, label: "Время"   },
    agent: { type: Types.Text, initial: true, label: "Агент"   }


});

Ned.schema.pre('save', function(next) {

    var nedv = this;
    if(nedv.ids === undefined) {
        var q = Ned.model.findOne().sort('-ids');
        console.log("This id: " + nedv.ids);
        q.exec(function(err, max) {
            if(max != null) {
                nedv.ids = (max.ids) ? max.ids + 1 : 1;
                console.log("Max id " + max.ids);
                next();
            }else{
                nedv.ids = 1;
                console.log("Max null" + this.ids);
                next();
            }
        });
    } else {
        next();
    }

});


/**
 * Methods
 * =======
*/
/*
Ned.schema.methods.refreshID = function(callback) {
    console.log("this.ids " + this.ids);
        var nedv = this;
        nedv.save();
}
*/


Ned.defaultColumns = 'name, category, typeobyavl, address, etaz, etazost, plosh, price, contact, new';
Ned.register();