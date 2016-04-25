# 1. Установка
Перед началом установки убедитесь что на вашем компьютере установлен npm (пакетный менеджер node.js).
### 1.1. Установка bower
```sh
$ npm install -g bower
```
### 1.2. Установка JBZoo jQuery-Factory
C помощью менеджера пакетов bower устанавливаем jquery-factory. Перейдите в папку, в которую необходимо загрузить саму библиотеку и зависимости, далее выполните команду:
```sh
$ bower install jbzoo-jquery-factory
```
Поле того как данная команда выполнится в вашем проекте будет создана папка `bower_components`.
### 1.3. Подключение статики пакетов
В главном html файле делаем подключение jquery, jbzoo-utils и jquery-factory.
```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jbzoo-utils/src/helper.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/widget.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/jbzoo.js"></script>
```
# 2. Использование (Создание виджета)
Скелет виджета выглядит следующим образом:
```js
;
(function ($, window, document, undefined) {

    JBZoo.widget('JBZoo.MyWidget', {
        'type' : 'my-type',
            'recurse' : {
                'param1' : 'value-1',
                'param2' : 'value-2',
                'param3' : 'value-3'
            }
    }, {
        init: function () {
            alert('Hello word!');
        }
    });

})(jQuery, window, document);

```
Первый парамет `JBZoo.MyWidget` - название виджета, по умолчанию наследуется от виджета JBZoo. Вторым параметром в виде JSON передаются конфиги(опции) для нашего виджета. Далее, внутри метода init можно писать обычный JS код виджета.
### 2.1. Собития
События в виджетах JBZoo не сильно отличаются от событий jQuery.

Пример html кода:
```html
<script>
    // Инициализация виджета
    jQuery(function ($) {
        $(".myWidgetClass").JBZooMyWidget();
    });
</script>
<div class="wd-wrapper">
    <div class="myWidgetClass">
        <a href="#tab" class="my-class">Title</a>
        <a href="#tab-2" class="my-class">Title-2</a>
    </div>
</div>
<p class="text">My custom text</p>
```

Код нашего виджета:
```js
;
(function ($, window, document, undefined) {

    JBZoo.widget('JBZoo.MyWidget', {
        'type' : 'my-type',
            'recurse' : {
                'param1' : 'value-1',
                'param2' : 'value-2',
                'param3' : 'value-3'
            }
    }, {
        init: function () {
            //  Инициализации виджета
            alert('Hello word!');
        },

        //  Обращение по классу
        'click .my-class': function (e, $this) {
            var $link = $(this);
            alert($link.attr('href'));
        },

        //  Обращение к блоку на котором инициализирован виджет
        'click {element}': function () {
            //  Добавим по клику новый класс
            $(this).addClass('element-click');
        },

        //  Глобальное обращение к элементу через документ
        'click {document} .text' : function () {
            alert($(this).html());
        },

        //  Поиск первого подходящего элемента
        'click {closest .wd-wrapper}' : function () {
             //  Добавим по клику новый класс
            $(this).addClass('closest-click');
        }
    });

})(jQuery, window, document);

```
С библиотекой JBZoo jQuery-Factory не нужно задумываться о двойной инициализации виджетов. Если в коде уже где то инициализировался виджет, то вторая(последующая) инициализация пройдет мимо, тем самым не вызывая конфликтов и ошибок. Так же при инициализации двух совершенно разных виджетов каждый работает не зависимо друг от друга.
# 3. Наследование
Если вам необходимо получить  функционал какого то виджета, но необходимо изменить данные или методы - Вы можете просто отнаследоваться от нужного виджета и делать свои изменения.
```js
;
(function ($, window, document, undefined) {

    //  Наследуемся от виджета JBZoo.MyWidget
    JBZoo.widget('JBZoo.MyWidget.Inherit', {
        'type' : 'no-type' // Изменяем параметры
    }, {

        //  Изменяем методы.
        init: function () {
            alert('Is inferit!');
        }
    });

})(jQuery, window, document);
```
Наш новый виджет полностью повторяет функционал, за исключение переопределенного метода init и параметра type. Не забывайте сделать инициализацию виджета:
```html
<script>
jQuery(function ($) {
    $(".myClass").JBZooMyWidgetInherit();
});
</script>
```
# 4. Дополнительно
```js
//  Обращение к элементу на котором инициализировался виджет
console.log(this.el);

//  Таким образом можно осуществлять например поиск внутри элемента
this.el.find('.my-class');

//  Получение опций
this.options.recurse

//  Ajax
'click .add': function (e, $this) {
   $this.ajax({
        'url'    : 'my/url/',
        'data'   : {
            'key': 'my-key-value'
        },
        'success': function (data) {
            allert(success);
        },
        'error'  : function (error) {
            alert(error);
        }
    });
}

//  Задержка выполнения сценария
this._delay(function () {
    alert('Delay method')
}, 2000);
```
