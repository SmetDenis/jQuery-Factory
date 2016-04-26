# JBZoo jQuery-Factory [![Build Status](https://travis-ci.org/JBZoo/jQuery-Factory.svg?branch=master)](https://travis-ci.org/JBZoo/jQuery-Factory)

**JBZoo jQuery-Factory** - это инструмент который помогает создавать, не просто jQuery плагины, а по настоящему удобные, гибкие и структурированные виджеты благодаря которым вы получаете следующие плюсы:
 1. Удобство и легкость при разработке
 2. Забудете что такое двойная инициализация на одном элементе
 3. Вы создаете не просто функции, а полноценные объекты
 4. Блогодоря наследованию вы можете легко изменять или расширять функционал виджета, полностью или частично заменить набор значений по умолчанию
 5. Делегирование событий по умолчанию
 6. Учет виджетов по атрибуту data-widgetid
 7. При инициализации двух совершенно разных виджетов каждый работает не зависимо друг от друга
 8. Дополнительные методы которые упростят разработку

# Установка
Перед началом установки убедитесь что на вашем компьютере установлен **npm** (пакетный менеджер node.js) и **bower**.
C помощью менеджера пакетов **bower** устанавливаем последнюю **JBZoo jQuery-Factory**. Перейдите в папку, в которую необходимо загрузить саму фабрику виджетов и зависимости и далее выполните команду:
```sh
$ bower install jbzoo-jquery-factory
```
После того как данная команда выполнится в вашем проекте будет создана папка `bower_components` в которой будут находится все необходимые для подключения файлы.

Теперь в главном файле вашего проекта необходимо подключить JS файлы библиотек ***jquery, jbzoo-utils*** и ***jbzoo-jquery-factory***.
```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jbzoo-utils/src/helper.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/widget.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/jbzoo.js"></script>
```
# Использование библиотеки
Пример html:
```html
<script>
    // Инициализация виджета
    jQuery(function ($) {
        $(".myWidgetClass").MyWidget();

        //  Инициализируем наш виджет и устанавливаем значения
        $(".jsWidget").MyWidget({
            'type': 'collapse',
            'css': {
                'color': '#333',
                'background': 'yellow'
            },
            onInitCallback: function ($this) {
                //  ...
            }
        });
    });
</script>
<div class="wd-wrapper">
    <div class="myWidgetClass">
        <a href="#tab" class="my-class">Title</a>
        <a href="#tab-2" class="class-title">Title-2</a>
    </div>
</div>
<div class="wd-wrapper-2">
    <div class="jsWidget">
        <a href="#link" class="my-class">Link</a>
        <a href="#how-to-use" class="class-title">How to use?</a>
        <div class="myClass" style="padding: 10px; background: #ccc;">
            <a href="#test" id="link">Link label</a>
            <input type="radio" name="white" id="yellow" value="yellow" class="color-input">
        </div>
    </div>
</div>
<h1 class="page-title">My page title</h1>
<p class="text">My custom text</p>
```
Виджет с минимальным набором свойств и методов может иметь следующий вид:
```js
JBZoo.widget(
    //  Название виджета в CamelCase стиле
    'MyWidget',
    //  Значения по умолчанию
    {
        //  Установленные значения могут быть как любого типа, так и любой вложенности.
        'type': 'dropdown',
        'myInt': 99,
        'myBool': true,

        //  Пример вложенных значений
        'css': {
            'color': '#ccc',
            'background': 'red'
        },

        //  В виде значения по умолчанию можно так же передать функцию.
        onInitCallback: function ($this) {
            //  ...
        }
    },
    {

        //  Произвольное свойство объекта
        elemType: false,

        //  Метод init - конструктор нашего виджета, выполняется один раз при инициализации виджета
        init: function () {
            //  Обращение к html элементам виджета.
            //  1. this.el - Получение елемента на который мы инициализировали виджет, а далее осуществляем поиск
            this.el.find('.page-title').addClass('my-class');

            //  2. this.$() - Осуществляем выборку элемента по селектору внутри виджета
            this.$('.page-title').addClass('my-class');

            //  3. Глобальное получение элемента по его селектору. Внутри и за пределами виджета.
            $('.page-title').addClass('my-class');

            //  Внутри можно подготовить данные для дальнейшей работы виджета или любые другие действия
            //  Обращение к методу объекта - вызов
            this.myCustomMethod(this);

            //  Осуществляем проверку на то что параметр - это функция
            if ($.isFunction(this.options.onInitCallback)) {
                //  Вызываем нашу функцию и передаем this. this - это контекст нашего виджета.
                this.options.onColorClick.apply(this, [this]);
            }

            /**
             * Фабрика виджетов использует дополнительный хелпер JS-Utils.
             * https://github.com/JBZoo/JS-Utils/blob/master/src/helper.js
             * Все виджеты наследуются от хелпера, поэтому все методы хелпера
             * доступны через контекст нашего виджета this
             */

            this.empty();
            this.isArrayLike();

            //  Получить объект хелпера вне виджета можно с помощью:
            window.JBZoo.empty();
            window.JBZoo.isArrayLike();
        },

        //  Произвольный метод объекта
        myCustomMethod: function ($this) {
            //  Обращение в свойству объекта
            var type = this.elemType;

            //  Получить значения виджета можно с помощью
            var valFromOpt = $this.options.myBool;
        },

        /*
         * Событие по клику внутри виджета по определенному классу
         *
         * e - объект, содержащий данные о произошедшем событии
         * $this - это контекст нашего виджета
         */
        'click .my-class': function (e, $this) {
            //  Получаем контекст ссылки
            var $link = $(this);
            alert($link.attr('href'));
        },

        //  Событие по клику с обращением к блоку на котором инициализирован виджет
        'click {element}': function (e, $this) {
            /**
             * Добавим по клику новый класс. Исходя из нашего html примера
             * класс будет добавлен блоку с классом myWidgetClass
             */
            $(this).addClass('element-click');
        },

        //  Событие по клику с обращением к элементу через документ. jQuery аналог $('.text')
        'click {document} .text' : function () {
            alert($(this).html());
        },

        //  Событие по клику с поиском первого подходящего элемента
        'click {closest .wd-wrapper}' : function () {
             //  Добавим по клику новый класс
            $(this).addClass('closest-click');
        },

        //  Слушаем событие другого виджета.
        'change.JBZooMyChoosen .jsSelect': function (e, $this) {
            //  ...
        }
    }
);
```
При написании оборачивается код виджета в функцию следующим образом:
```js
(function ($, window, document, undefined) {

    JBZoo.widget('MyWidget', {},
        {
            init: function () {
            }
        }
    );

})(jQuery, window, document);
```
Это нужно что бы изменить область видимости переменных - замыкание.
# Виджет JBZoo и Наследование
Т.к при создании виджета в конечном результате мы получаем полноценный объект, мы можем осуществлять наследования от одного виджета к другому. В **JBZoo jQuery-Factory** по умолчанию уже находится один общий виджет в котором находятся полезные свойства. Такие как:
```js

//  JBZoo Ajax
$this.ajax({
    'url'    : 'my/url/',
    'data'   : {
        'key': 'my-key-value'
    },
    'target'  : false,
    'dataType': 'json',
    'success': function (data) {
        alert('success');
    },
    'error'  : function (error) {
        alert('error');
    }
});

//  Получение data данных. Если не селектор(2-й параметр) data-id будет браться у родителя иначе у потомков.
$this.data('id', '.link-class');

//  Получение атрибута. Как и в $this.data() ситуация с селектором аналогичная
$this.attr('href', '.link-class');

//  Если подключить jquery плагин sweetAlert вы можете воспользоваться уже готовыми методами
$this.alert(message, closeCallback, params);
$this.confirm(message, yesCallback, noCallback, context);

//  Работа с куками при наличии подключенного jQuery Cookie плагина
$this.setCookie(key, value, namespace);
$this.getCookie(key, defaultVal, namespace);
```
Полезные методы могут использоваться повсеместно, поэтому рекомендуем (*не обязательно*) вам всегда наследоваться от виджета **JBZoo**. Как было сказанно выше именование виджетов происходит в **CamelCase** стиле, в то же время название являяется еще и **namespace** - ом виджета. Теперь, что бы наш виджет был унаследован от **JBZoo** нам необходимо создвать виджет следующим образом:
```js
JBZoo.widget('JBZoo.MyWidget', {
    'option': 'value-1',
    'text': 'My custom text',
    'css-options': {
        'color': 'red',
        'padding': '10px',
        'background': '#ccc'
    }
}, {
    'click .link': function () {
        alert('Hello world!');
    }
});
```
```html
<!-- Инициализация виджета будет иметь вид -->
<script>
    jQuery(function ($) {
        $("#my-id").JBZooMyWidgett();
    });
</script>
```
Другими словами, в название виджета, сначала указываете имя родительского виджета, далле через точку название своего. Возникла ситуация когда необходимо сделать наследование даже через один виджет? Не проблема, наследование будет выглядеть следующим образом:
```js
JBZoo.widget('JBZoo.MyWidget.MyFormWidget', {}, {});

/**
 * Переопределение значений по умолчанию рекурсивное, поэтому
 * можно заменять данные как частичто так и полностью.
 */
JBZoo.widget('JBZoo.MyWidget.MyFormWidget', {
    //  Простое переопределение значения
    'text': 'Yuri Gagarin was the first man who had been in space',
    'css-options': {
        // Вложенное переопределение значения
        'padding': '0'
    }
}, {

    // Если вам необходимо переопределить конструктор или любой другой метод - объявите его
    init: function () {
        // ... новый код
    },

    //  Переопределение метода
    'click .link': function () {
        alert('Hello from Yuri Gagarin!');
    }
});
```
```html
<!-- Инициализация виджета будет иметь вид -->
<script>
    jQuery(function ($) {
        $("#my-id").JBZooMyWidgettMyFormWidget();
    });
</script>
```

В фабрике виджетов есть **деструктор** виджета, который необходим для деинициализации. Например, в какой то определенный момент сценария необходимо удалить виджет...
```js
jQuery(function ($) {
    //  Инициализация виджета
    var isDestroy = false;
    $("#my-id").JBZooMyWidgettMyFormWidget();
    //  какой то код...
    //  Деинициализации виджета.
    if (isDestroy) {
        $("#my-id").JBZooMyWidgettMyFormWidget('destroy');
    }
});
```
Чуть выше был показан один из способов обращения к публичному методу. Это может быть полезно для отладки виджета, к примеру при разработке мы хотим посмотреть как отреагирует виджет если будет вызван публичный метод с каким то параметром. Для этого в консоле вы можете написать:
```js
/**
 * Данный вариант сработает если виджет MyWidget уже инициализирован.
 * Первый параметр 'setValue' - это метод, далее перечисляются значания
 */
jQuery('.value:eq(0)').MyWidget('setValue', 50);

//  Если же виджет не инициализированн стоит использовать:
jQuery('.value:eq(0)').data('MyWidget').setValue(50);
```
### Лицензия
MIT