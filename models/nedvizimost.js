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
    myid: { type: Types.Number, index: true },      // id ломает все нахер!
    new: { type: Types.Text, initial: true, label: "Новая"   },
    raion: { type: Types.Text, initial: true, label: "Район"   },
    address: { type: Types.Text, initial: true, label: "Адрес"   },
    etaz: { type: Types.Text, initial: true, label: "Этаж"   },
    etaznost: { type: Types.Text, initial: true, label: "Этажность"   },
    plosh: { type: Types.Text, initial: true, label: "Площадь"   },
    zilaya: { type: Types.Text, initial: true, label: "Жилая"   },
    kuhnya: { type: Types.Text, initial: true, label: "Кухня"   },
    price: { type: Types.Text, initial: true, label: "Цена"   },
    contact: { type: Types.Text, initial: true, label: "Телефон"   },
    date: { type: Types.Text, initial: true, label: "Дата"   },
    source: { type: Types.Text, initial: true  },
    typeobyavl: { type: Types.Text, initial: true  },
    marketType: { type: Types.Text, initial: true  },
    komnat: { type: Types.Text, initial: true  },
    category: { type: Types.Text, initial: true  },
    houseType: { type: Types.Text, initial: true  },
    leaseType: { type: Types.Text, initial: true  },
    persname: { type: Types.Text, initial: true  },
    contname: { type: Types.Text, initial: true  },
    photos: { type: Types.Text, initial: true  },
    text: { type: Types.Text, initial: true  },
    link: { type: Types.Text, initial: true  },
    time: { type: Types.Text, initial: true  },
    agent: { type: Types.Text, initial: true  }


});

Ned.schema.pre('save', function(next) {

    var nedv = this;
    var q = Ned.model.findOne().sort('-myid');

    console.log("Max id000 " + nedv.name);

    q.exec(function(err, max) {
        console.log("Max id111 " + nedv.name);
        if(max != null) {
            nedv.myid = (max.myid) ? max.myid + 1 : 1;
            console.log("Max id " + max.myid);
            next();
        }else{
            nedv.myid = 1;
            console.log("Max null" + this.myid);
            next();
        }
    });
});


/**
 * Methods
 * =======
*/
/*
Ned.schema.methods.refreshID = function(callback) {
    console.log("this.myid " + this.myid);
        var nedv = this;
        nedv.save();
}
*/


Ned.defaultColumns = 'name, new, raion, address, etaz, etaznost, plosh, zilaya, kuhnya, price';
Ned.register();