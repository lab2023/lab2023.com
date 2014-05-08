---
title: Sencha Touch ile Basit Liste Detay Uygulaması
date: 2014-05-08
tags: sencha touch
---

Bu yazıda giriş seviyesinde Sencha Touch ile nasıl liste detay bir uygulama yapacağımızı göreceğiz.

Komut satırından uygulamayı oluşturuyoruz.

```
sencha generate app -name Gourmet -path ~/Documents/projects/gourmet
```
Oluşturduğumuz uygulama dizinine gidip projeyi çalıştıralım.

```
sencha web start
```

Localhost 1841 portunda uygulamanın çalıştığını göreceksiniz. Uygulamanın içerisinde örnek bir tab ekranı vardır.

![Sencha](https://photos-2.dropbox.com/t/0/AAAgVL7ujCLRp72A9F1bojeFSyzK-IjxRURHIMWGC--Zcw/12/44821222/png/1024x768/3/1399550400/0/2/sencha_touch_1.png/HaaIXHAgBW7qfQanbnIxxtHMlAM_-usLfQCuR504bFA)

`app/model` içerisine `Food` isminde yeni bir model oluşturuyoruz.

```js
Ext.define('Gourmet.model.Food', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'name',
            'picture',
            'description'
        ]
    }
});
```

Buradaki `fields` alanına apiden dönen değerlerden hangilerini okuyacağımızı belirtiyoruz.

`app/store` içerisine `Foods` isminde yeni bir store oluşturuyoruz. İsminin `Foods` olması zorunlu değil.

```js
Ext.define('Gourmet.store.Foods', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Gourmet.model.Food',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: "data/foods.json",
            reader: {
                rootProperty: 'data',
                type: 'json'
            }
        },
        sorters: 'id'
    }
});
```

`model` bağlı olunan model.

`proxy` alanı veriyi okuma, yazma vs. konuları için. Bu uygulamada verileri local bilgisayardan alıyoruz. API için `url` alanını değiştirmeniz yeterlidir.

`sorters` verinin hangi alana göre sıralı olacağını belirtir.

Oluşturduğumuz model ve store ları `app.js` içerisinde belirtelim. Bu işlemi ekleyeceğimiz diğer dosyalar içinde yapacağız.

```js
models: ['Food'],
stores: ['Foods'],
```

Şimdi arayüzleri oluşturmaya geçelim.

`app/view` içerisine `Food.js` dosyasını oluşturalım.

```js
Ext.define('Gourmet.view.Foods', {
    extend: 'Ext.navigation.View',
    xtype: 'food_panel',

    config: {
        defaultBackButtonText: "Geri",
        items: [{
            title: 'Yemek Listesi',
        	// Buraya liste gelecek
        }]
    }
});
```
[NavigationView](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.navigation.View) [card](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.layout.Card) layout ile birlikte oluşturulmuş basit bir [container](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Container)' dır.

Şimdi bunu `Main.js` içerisinde hazır gelen tab panelin bir tabına yerleştirelim. Bunun için `items` dizisine aşağıdaki gibi bir item ekliyoruz.

```js
{
    title: 'Yemek Listesi',// Tab linklerinde görünecek isim
    iconCls: 'list',
    xtype: 'food_panel' // Food.js te verdiğimiz xtype
}
```
![Elsan](https://photos-6.dropbox.com/t/0/AABx-9WoAhiLTJhbhc6iGXmDdQTveNl5l_R8jvvIikEOuQ/12/44821222/png/2048x1536/3/1399550400/0/2/Screen%20Shot%202014-05-08%20at%201.18.37%20PM.png/z2Wenm_89QeymJi6W_NN4ep0goT3mTKkFzBczGTxl-I)

Listeyi oluşturalım. `view` altına `FoodList.js` dosyası oluşturuyoruz. Bu dosya [Ext.List](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.dataview.List) compenentinden extend edilecek.

```js
Ext.define('Gourmet.view.FoodList', {
    extend: 'Ext.List',
    xtype: 'food_list',
    config: {
        title: "Yemek Listesi",
        itemTpl: '{name}',
        store: 'Foods',
        onItemDisclosure: true
    }
});
```

* `store`: Verileri alacağı store.

* `itemTpl`: Verinin listede nasıl görüneceği. Burayı css ile özellştirebilirsiniz. Birden fazla bilgi gösterebilirsiniz. `'{name} - {description}'` gibi.

* `onItemDisclosure`: Detay butonunun olup olmayacağını belirtiyor.

* `Food.js` içerisindeki items içerisine bu listeyi ekleyelim.

```
items: [{
        	xtype: 'food_list'// Buraya liste gelecek
        }]
```
![Sencha](https://photos-4.dropbox.com/t/0/AAAY0FPjShJ46vxddFPrUpgX0weeMlbri9b4PjwTVWBrJg/12/44821222/png/1024x768/3/1399550400/0/2/Screen%20Shot%202014-05-08%20at%201.43.41%20PM.png/LQjNJK3he_q2zdmOvfTciUppW4N18Axq560PMZOWetI)

Detay butonu var ama çalışmıyor. Detay sayfası yapalım ve butona işlevsellik kazandıralım.

`FoodDetail.js` dosyası oluşturalım. Bu dosya [Ext.Panel](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Panel) competendinden exten edilecek.

```js
Ext.define('Gourmet.view.FoodDetail', {
    extend: 'Ext.Panel',
    xtype: 'food_detail',
    config: {
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: "<img src='{picture}' /> <br /> <p>{description}</p>"
    }
});
```
* `styleHtmlContent` : Html içeriği otomatik stillendirir. Default false gelir.

* `scrollable` : Ekranın scrool özelliğini ne şekilde olacağını belirtir.

* `tpl` : [Template](http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Template) içeriği buraya yazıyoruz. Template' ler içerisinde bulunan componente setlenen data' yı `{key}` şeklinde kullanmaya olanak sağlar.

`controller` içerisindeki `Main.js` dosyasını aşağıdaki gibi düzenleyelim.

```js
Ext.define('Gourmet.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            foodList: 'food_list',
            foodMain: 'food_panel'
        },
        control: {
            foodList: {
                disclose: 'showFoodDetail'
            }
        }
    },

    showFoodDetail: function(list, record) {
        this.getFoodMain().push({
            xtype: 'food_detail',
            title: record.data.name,
            data: record.getData()
        })
    }
});
```

* `refs` : Bu alanda xtype ve id ye göre compenentleri alabiliyoruz.
* `controle` : Compenetlerin event' larının takip edildiği yer. Yukarıdaki örnekte `xtype: 'food_list'` olan componentin `disclose` event(olayında) yapılacak işlemi belirtiyoruz. `showFoodDetail` metodu, `xtype: 'food_panel'` olan `Ext.navigation.View` componentin içerisine belirtilen özelliklerdeki view alanını(detay sayfasını) ekliyor.

![Sencha](https://photos-5.dropbox.com/t/0/AABHGx5loTa4uLvqfHlspVCXoWKezk1ETv50L-GsIJ6lMg/12/44821222/png/1024x768/3/1399554000/0/2/Screen%20Shot%202014-05-08%20at%202.35.58%20PM.png/QH-nKHWsfhvEfxKr00OF4Kxlw3tKFtCc43QgOfF_fFg)

Kodlara [buradan](https://github.com/muhammetdilek/gourmet) ulaşabilirsiniz.