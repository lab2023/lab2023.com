---
title: Rails5 de Fineuploader Kullanımı
date: 2017-03-10
author: h_1520
tags: ruby, fineuploader, file, upload, rails, programming
---

Merhabalar,

Bu yazıda sizelere Rails'de Fineuploader kullanımını bazı özelliklerini kullandığımız bir örnek ile göstereceğim. Fineuploader dosya yükleme işlemleriniz için kullanabileceğiniz bir dosya yükleme kütüphanesidir.
Fineuploader'ı kullanmak için web sayfasına ilk girdiğinizde muadilleri ile arasındaki farkı gösteren tablo ve şu sloganlar:

```
- File uploading without the hassle
- Everything you need in a JavaScript file upload library
- Completely "free as in speech" open source software, developed by the community, and sponsored by a company that cares.
```
muadilleri yerine Fineuploader'ı kullanmanız için sizi cezbetmeye yetecektir.

Öncelikle [ Fineuploader download ](https://fineuploader.com/customize.html) sayfasına giderek ```Traditional``` için dosyalarımızı indiriyoruz. Bu dosyamızın içinden ```jquery.fine-uploader.js``` dosyamızı ```vendor/assets/javascripts``` klasörünün içine, ```fine-uploader-gallery.css```
dosyamızı ```vendor/assets/stylesheets``` klasörünün içine atıp 'javascript' ve 'CSS' dosyalarımıza bağlantılarını yapıyoruz ayrıca şu dosyalarımızı: 
    
    - fine-uploader/loading.gif
    - fine-uploader/processing.gif
    - fine-uploader/continue.gif (isteğe bağlı - yükleme durdurma özelliğini kullanacaksanız)
    - fine-uploader/edit.gif     (isteğe bağlı - dosya ismi düzenleme özelliğini kullanacaksanız)
    - fine-uploader/retry.gif    (isteğe bağlı - yüklemesi başarısız olan bir dosyayı tekrar yükleme özelliğini kullanacaksanız)
    - fine-uploader/trash.gif    (isteğe bağlı - dosya silme özelliğini kullanacaksanız).
    
```assets/images``` klasörünün içine ve şu dosyalarımızı:

    - fine-uploader/placeholders/not_available-generic.png
    - fine-uploader/placeholders/waiting-generic.png`
    
```public/fine_uploader```klasörünün içine atıyoruz.

Şu an itibariyle Fineuploader'ın kullanımı için alt yapımızı hazırladık.

Fineuploader'ın arayüz kodlarını için aşağıdaki kodları bir ``_fine_uploader_template.html.erb``` adında partial hale getirelim .

```html

<script type="text/template" id="qq-template-gallery">
        <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Drop files here">
            <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
            </div>
            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                <span class="qq-upload-drop-area-text-selector"></span>
            </div>
            <div class="qq-upload-button-selector qq-upload-button">
                <div>Upload a file</div>
            </div>
            <span class="qq-drop-processing-selector qq-drop-processing">
                <span>Processing dropped files...</span>
                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
            </span>
            <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
                <li>
                    <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                    <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                    </div>
                    <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                    <div class="qq-thumbnail-wrapper">
                        <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                    </div>
                    <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                    <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                        <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>
                        Retry
                    </button>

                    <div class="qq-file-info">
                        <div class="qq-file-name">
                            <span class="qq-upload-file-selector qq-upload-file"></span>
                            <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                        </div>
                        <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                        <span class="qq-upload-size-selector qq-upload-size"></span>
                        <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">
                            <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                            <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                            <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>
                        </button>
                    </div>
                </li>
            </ul>

            <dialog class="qq-alert-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Close</button>
                </div>
            </dialog>

            <dialog class="qq-confirm-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">No</button>
                    <button type="button" class="qq-ok-button-selector">Yes</button>
                </div>
            </dialog>

            <dialog class="qq-prompt-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <input type="text">
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Cancel</button>
                    <button type="button" class="qq-ok-button-selector">Ok</button>
                </div>
            </dialog>
        </div>
    </script>

<div class="fine-uploader-gallery" data-post-url="<%= data_post_link %>" data-input-name="<%= input_name %>" data-delete-endpoint="<%= delete_endpoint %>" ></div>
```

Yukarıdaki kodlarda son satır bizim `coffeescript` kodları ile bağlantımızı yapan kısımdır. Artık bu noktadan sonra bu dosyayı nereden render edersek orada fineuploader'ı kullanabiliriz. Peki bu satırdaki dataları neden `coffeescript` tarafına gönderiyoruz?
Bunun cevabını şu şekilde açıklayabilirim: ```post-url``` yüklenen dosyanın gideceği endpointi belirlemek için, ```input-name``` dosyalarınızı strong parametreden geçirebilmeniz için gereken parametre ismini düzenleyebilmeniz için, ```delete-endpoint``` ise
eğer yüklenen dosyalarınızda delete özelliğini kullanmak isterseniz yapılacak olan isteğin gideceği endpointi belirlememizi sağlaması için bu dataları gönderiyoruz.
Şimdi gelelim `coffeescript kodlarına:

```coffeescript
    $('#fine-uploader-gallery').fineUploader
        template: 'qq-template-gallery'
        request:
          inputName: $('#fine-uploader-gallery').data('input-name')
          endpoint: $('#fine-uploader-gallery').data('post-link')
        deleteFile:
          enabled: true,
          confirmMessage: "{filename} isimli fotoğrafı silmek istediğinize emin misiniz?"
          endpoint: $('#fine-uploader-gallery').data('delete-endpoint')
        retry:
          enableAuto: true
        messages:
          tooManyItemsError: "({netItems}) adet fotoğraf, yüklemek için çok fazla. En Fazla {itemLimit} adet fotoğraf yükleyebilirsiniz."
        callbacks:
          onComplete: (id, name, response, xhr) ->
            * kodlar buraya gelecek
          onProgress: (id, fileName, loaded, total) ->
            * kodlar buraya gelecek
          onAllComplete: () ->
            * kodlar buraya gelecek
        failedUploadTextDisplay: mode: 'custom'
        thumbnails: placeholders:
          waitingPath: '/fine_uploader/waiting-generic.png'
          notAvailablePath: '/fine_uploader/not_available-generic.png'
        validation:
          itemLimit: 10
        scaling:
          sendOriginal: false
          sizes: [ {
            maxSize: 1000
          } ]
```

Yukarıdaki kodlar projelerde kullandığım özellikleri içeren kodlardır. Sizlere bunları açıklayacağım, Fineuploader'da bunun gibi bir çok özellik bulunmaktadır, web sayfasına gidip diğer özellikleri de öğrenebilirsiniz.
    
    - request: Yüklenen dosyaların inputName'ini ve endpoint'ini belirtiyoruz bu sayede fotoğrafı istediğimiz yere istediğimiz parametre ismi ile gönderebiliriz.
    - deleteFile: Delete özelliğini kullanmak isterseniz bu option işinizi görecektir fakat default olarak istek 'uuid' ile yapılmaktadır eğer 'uuid' yerine başka bir parametre ile bu isteği yapmak isterseniz 'onComplaete' callback'inin içinde kullanacağımız 'setUuid' metodu işinizi görecektir.
      'enable' ile yüklenen dosyanın silinmesini etkinleştiririz veya devredışı bırakırız. 'confirmMessage' ile default mesajı değiştirebilmemizi sağlar. 'endpoint' ile yapılacak olan isteğin gideceği yeri ayarlamamızı sağlar. 
    - retry: Bu option ile 'enableAuto: true' yaptığınız zaman eğer olurda dosya yüklenmez ise otomatik olarak dosya 3 kere daha yüklenmeyi dener yine olmaz ise yükleme isteği kesilir.
    - messages: Fineuploader'da bulunan default mesajları değiştirebilmemizi sağlar. Yukarıda bir adet örneğini görüyorsunuz.
    - callbacks: Fineuploader da çok kullanışlı callback'ler vardır yukarıda bunlardan birkaç tanesini görüyorsunuz. onComplete: yüklenen her dosya sonrasında çalışır, onProgress: tüm dosyaların yükleme işlemi devam ettiği sürece çalışır, onAllComplate: tüm dosyaların yükleme işlemi bittiğinde çalışır.
    - failedUploadTextDisplay: Bu option ile başarısız olan yükleme dosyaları için çıkan default mesajı 'mode: 'custom'' yaparak dosya yüklendikten sonra döndüreceğiniz json dosyasında 'message' parametresi ile değiştirebilirsiniz.
    - thumbnails: Option'ında 'placeholders' ile dosya hazırlanırken veya ulaşılamazken çıkacak resimler ayarlanır.
    - validation: Bu option ile validasyonları kullanabiliriz. Mesela yukarıda 'itemLimit' validasyonu yer almaktadır. Bu validasyon ile Fineuploader ile bir anda 10 adet dosya yüklenebilir.
    - scaling: Bu option Fineuploader'ın bizlere sunduğu en önemli özelliklerden bir tanesi diyebilirim. Bu option ile yüklenen fotoğrafların boyutlarını ölçeklendirebilirsiniz, bu işlemi çok hızlı bir şekilde yapmaktadır. Yukarıda yüklenen fotoğrafın 'sendOriginal: false' ile ölçeklendirilmiş hali gönderilmektedir.
      'maxSize: 1000' ile uzun kenar maksimum 1000 piksel olacak şekilde ayarlanmıştır. Fakat 'scaling' option'ında ölçeklendirilen fotoğrafların isimleri 'Blob' olarak gönderilmektedir. Tabi fotoğrafın orjinal ismi de gönderilmektedir, orginal ismi ile gönderilen ismi yer değiştirip fotoğrafın orjinal ismini kullanabilirsiniz. 
      
  Sizlere Fineuploader'ın ne olduğundan ve Rails'de kullanımından kısaca bahsettim. Fineuploader sürekli güncellenmekte ve desteklenmektedir. Fineuploader'ın daha birçok özelliğini web sayfasını kurcalayarak öğrenebilir ve kullanabilirsiniz. [ Buradan ](https://fineuploader.com) web sayfasına gidebilirsiniz.
  
Bu yazının sizlere faydalı olması dileğiyle...