var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Ned = new keystone.List('nedvizimost', {
    defaultSort: '-new',
    label: 'Недвижимость',
    singular: 'Недвижимость',
    plural: 'Записи Недвижимости',
    defaultSort: '-name',
    path: 'nedvizimost',   // Путь в УРЛЕ
    autokey: { from: 'id', path: 'id' }
});

Ned.add({

    id: { type: Types.Number },
    raion: { type: Types.Text, initial: true  },
    address: { type: Types.Text, initial: true  },
    etaz: { type: Types.Text, initial: true  },
    etaznost: { type: Types.Text, initial: true  },
    plosh: { type: Types.Text, initial: true  },
    zilaya: { type: Types.Text, initial: true  },
    kuhnya: { type: Types.Text, initial: true  },
    price: { type: Types.Text, initial: true  },
    contact: { type: Types.Text, initial: true  },
    city: { type: Types.Text, initial: true  },
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
    new: { type: Types.Text, initial: true  },
    date: { type: Types.Text, initial: true  },
    time: { type: Types.Text, initial: true  },
    agent: { type: Types.Text, initial: true  }


});

Ned.defaultColumns = 'new, price, city, raion, address';
Ned.register();