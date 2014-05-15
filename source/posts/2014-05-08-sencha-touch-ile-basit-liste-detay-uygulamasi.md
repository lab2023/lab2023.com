---
title: Sencha Touch ile Basit Liste Detay Uygulaması
date: 2014-05-08
author: dilekmuhammet
tags: sencha touch, tr
---

Bu yazıda giriş seviyesinde Sencha Touch ile nasıl liste detay bir uygulama yapacağımızı göreceğiz.

Mac için sencha touch kurulumu:

* [http://www.sencha.com/products/sencha-cmd/download](Sencha CMD)' yi indirip kuruyoruz.
* [Sencha Touch](http://www.sencha.com/products/touch/download/) dosyasını indirip unzip yapıyoruz.
* Yeni uygulama oluşturmak için unzip yaptığınız klasörde olmalısınız.

Komut satırından uygulamayı oluşturuyoruz.

```
sencha generate app -name Gourmet -path ~/Documents/projects/gourmet
```
Oluşturduğumuz uygulama dizinine gidip projeyi çalıştıralım.

```
sencha web start
```

Localhost 1841 portunda uygulamanın çalıştığını göreceksiniz. Uygulamanın içerisinde örnek bir tab ekranı vardır.

![Sencha](articles/2014-05-08-sencha-touch-starter.png)

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
![Elsan](articles/2014-05-08-sencha-touch-starter1.png)

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
![Sencha](articles/2014-05-08-sencha-touch-starter2.png)

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
* `controller` içerisindeki `Main.js` dosyasını aşağıdaki gibi düzenleyelim.

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

![Sencha](articles/2014-05-08-sencha-touch-starter3.png)

Kodlara [buradan](https://github.com/muhammetdilek/gourmet) ulaşabilirsiniz.
