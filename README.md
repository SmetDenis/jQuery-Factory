# JBZoo jQuery-Factory [![Build Status](https://travis-ci.org/JBZoo/jQuery-Factory.svg?branch=master)](https://travis-ci.org/JBZoo/jQuery-Factory)

**JBZoo jQuery-Factory** - это инструмент который помогает создавать, не просто jQuery-плагины, а по настоящему удобные, гибкие и структурированные классы, которые имеют внутреннее состояние, пространство имен, умеют наследоваться (через prototype) и скрывают от вас всю черную работу. В общем, позволяет сконцентрироваться именно на логике работы интерфейса.

 "Из коробки" вы получаете следующее
 1. Виджет - это полноценный класс, который хранит состояние, может быть унаследован, расширен и он сам следит за событиями внутри себя. 
 2. Никакой случайной двойной инициализации виджета на одном DOM-элементе.
 3. Вы создаете не просто функции, а полноценные объекты, которые можно использовать как обычные плагины jQuery.
 4. Благодаря наследованию вы можете легко изменять или расширять функционал виджета, полностью или частично заменить набор значений по умолчанию и т.д.
 5. Все события используют только делегирование - это удобно при работе с AJAX.
 6. `data-widgetid` хранит номер id объекта для удобства отладки.
 7. При инициализации двух совершенно разных виджетов на одном и том же контейнере у вас не будет конфликтов, т.к. каждый из них работает в своем пространстве имен.
 8. Гибкая система событий и селекторов виджета.
 9. Дополнительные функции из jbzoo-utils, которые упростят разработку 
 10. Масса других приятных мелочей

## Установка
Перед началом установки убедитесь, что на вашем компьютере установлен **npm** (пакетный менеджер node.js) и **bower**. C помощью менеджера пакетов **bower** устанавливаем последнюю **JBZoo jQuery-Factory**. Перейдите в папку, в которую необходимо загрузить саму фабрику виджетов и зависимости. Далее выполните одну из команд:
```sh
$ bower install jbzoo-jquery-factory // вариант 1 
$ npn install jbzoo-jquery-factory   // вариант 2
```
После этого в вашем проекте будет создана директория `bower_components`, в которой будут
находится все необходимые для подключения файлы.

Теперь в главном файле вашего проекта необходимо подключить JS файлы библиотек ***jquery, jbzoo-utils*** и ***jbzoo-jquery-factory***. Конечно, вы можете их включить в ваш общий `bundle.js` через gulp, grunt или webpack.
```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jbzoo-utils/src/helper.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/widget.js"></script>
<script src="bower_components/jbzoo-jquery-factory/src/jbzoo.js"></script>
```


## Пример. Слова ничто - покажи мне код!

Пример html:
```html
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
        <div class="myClass">
            <a href="#test" id="link">Link label</a>
            <input type="radio" name="white" id="yellow" value="yellow" class="color-input">
        </div>
    </div>
</div>

<h1 class="page-title">My page title</h1>
<p class="text">My custom text</p>

<script>
jQuery(function ($) {
    $("#my-id").MyWidget({'styles' : {'background': '#fff'}}); // остальные опции берутся из значений опций по умолчанию
);
</script>
```

Пример jQuery-плагина и его возможностей
```js
JBZoo.widget(
    //  Название виджета, желательно в CamelCase стиле
    'MyWidget',
    
    //  Значения опций инициализации по умолчанию
    {
        //  Установленные значения могут быть как любого типа, так и с любой вложенностью.
        'type'  : 'dropdown',
        'myInt' : 99,
        'myBool': true,

        //  Пример вложенных значений
        'styles': {
            'color'     : '#ccc',
            'background': '#a00'
        },

        //  В виде значения по умолчанию можно так же передать функцию-callback
        onInit: function ($this) {
            // $this - объект виджета
        }
    },
    
    // Методы, события и свойства виджета
    {
        //  Произвольное свойство объекта (НЕ опция инициализации)
        elemType: false,

        /**
         * Метод init - конструктор нашего виджета, выполняется ТОЛЬКО один раз и ТОЛЬКО при инициализации виджета
         * Примеры в этом методе работают в любом методе виджета.
         */
        init: function ($this) {
            // Здесь $this это тоже самое что и this и передается для удобства, чтобы переменная существовала внутри функций.            // $this.options - это результат рекурсивного мержа опций из инициализации и опций по умолчанию с учетом наследования виджета
        
            //  Примеры обращение к html элементам виджета.
            //  1. this.el - это элемент, на котором мы инициализировали виджет. 
            this.el.find('.page-title').addClass('my-class');

            //  2. this.$() - Ищем выборку элемента по селектору внутри виджета. По сути это тоже самое что и this.el.find('.page-title'), но короче.
            this.$('.page-title').addClass('my-class');

            //  3. Обычный глобальный поиск элемента по его селектору по всем документе. т.е. $ - это обычный jQuery
            $('.page-title').addClass('my-class');

            //  Внутри конструкторе можно подготовить данные для дальнейшей работы виджета или любые другие действия
            //  Обращение к методу объекта - вызов
            this.myCustomMethod(arg1, arg2);

            //  Вызывает кастомный колбэк из опций инициализаций
            if ($.isFunction(this.options.onInit)) { // Проверка на всякий случай
                //  Передаем this и как контекст и как аргумент (ванильный JS)
                this.options.onInit.apply(this, [this]);
            }

            // Фабрика виджетов использует дополнительный хелпер JS-Utils, который  хранит небольшие стат. функции
            // https://github.com/JBZoo/JS-Utils/blob/master/src/helper.js
            this.jbzoo.empty(myVar); // Если виджет унаследован от JBZoo (см. ниже)
            window.JBZoo.empty(myVar);    // Через глоб переменную
        },

        /**
         * Произвольный метод объекта
         */
        myCustomMethod: function (arg1, arg2) {
            //  Обращение в свойству объекта
            var type = this.elemType;
            //  Значение опции, которое приходит из инициализации виджета (или то что стоит как умолчание)
            var valFromOpt = this.options.myBool;
        },

        /**
         * Событие по клику внутри виджета по определенному классу.
         * Работаем внутри этой функции как в обычных событиях jQuery.
         * 
         * e     - объект, содержащий данные о произошедшем событии
         * $this - это контекст нашего виджета, т.е объект класса-виджета
         */
        'click .my-class': function (e, $this) {
            //  Получили html, который кликнули и обернем его в jQuery 
            var $link = $(this); // помним, что здесь this != $this. Первый - это обычный контекст клика в jQuery
            alert($link.attr('href'));
        },

        /**
         * Событие клика контейнера, на котором инициализирован виджет
         */
        'click {element}': function (e, $this) {
            /**
             * Добавим по клику новый класс.
             * Исходя из нашего html примера, класс будет добавлен блоку с классом myWidgetClass
             */
            $(this).addClass('element-click');
        },

        /**
         * Клик элемента вне виджета, т.е. аналог jQuery('.text').on('click.MyWidget', ...)
         */
        'click {document} .text' : function (e, $this) {
            alert($(this).html());
        },

        /**
         * Клик по первому подходящему элементу, который обрамляет наш виджет
         */
        'click {closest .wd-wrapper}' : function () {
            //  Добавим по клику новый класс
            $(this).addClass('closest-click');
        },

        /**
         * Слушаем событие другого виджета, который лежит внутри "MyWidget" и называется "JBZoo.MySelect".
         * Событие change слушаем на классе .jsSelect
         */
        'change.JBZooMySelect .jsSelect': function (e, $this) {
            //  ...
        }
        
        /**
         * Ничто нам не меняет использовать свои названия событий
         */
        'myEvent {element}': function (e, $this) { }        
        'myAnotherEvent.JBZooMySelect .jsSelect': function (e, $this) { }
    }
);
```

Желательно обернуть свой код в анонимную функцию. Это изменит область видимости переменных и не даст случайно повлиять на глобальные переменные документа (через `var`).
Так же это позволяет нам явно использовать $ вместо jQuery без режима `jQuery.noConflict()` и создает настоящую переменную `undefined`.

```js
(function ($, window, document, undefined) {
    JBZoo.widget('MyWidget', {/* опции по умолчанию */}, {/* методы и события */});
})(jQuery, window, document);
```


## Родительский виджет JBZoo и наследование
Т.к при создании виджета в конечном результате получается полноценный объект, мы можем сделать наследование от
одного виджета к другому. В **JBZoo jQuery-Factory** по умолчанию уже находится один общий виджет, в котором вы найдете
 полезные методы. Такие как:
```js
// $this - объект виджета

//  JBZoo Ajax
$this.ajax({
    'url'    : 'my/url/',
    'data'   : {
        'key': 'my-key-value'
    },
    'success': function (data) {
        alert('success');
    },
    'error'  : function (error) {
        alert('error');
    }
});

//  Получение data данных внутри виджета. Если убрать селектор (2-й аргумент), то data-id будет браться у родителя (т.е. {element}) 
$this.data('id', '.link-class');

//  Получение атрибута. Как и в $this.data() ситуация с селектором аналогичная
$this.attr('href', '.link-class');

//  Если подключить jQuery плагин sweetAlert вы получите кастомизированный alert/confirm, либо будет использоваться браузерный
$this.alert(message, closeCallback, params);
$this.confirm(message, yesCallback, noCallback, context);

//  Работа с куками при наличии подключенного jQuery.cookie плагина
$this.setCookie(key, value, namespace);
$this.getCookie(key, defaultVal, namespace);
```
Полезные методы могут использоваться повсеместно, поэтому рекомендуем (*не обязательно*) вам наследоваться от
виджета **JBZoo**. Как было сказано выше именование виджетов происходит в **CamelCase** стиле, в то же время название
 является еще и **namespace**-ом виджета. Теперь, что бы наш виджет был унаследован от **JBZoo** нам необходимо
 создавать виджет следующим образом:
```js
JBZoo.widget('JBZoo.MyWidget', { // Точка - это "extend". Можно использовать цепочки наследования любой длины
    'option': 'value-1',
    'text'  : 'My custom text',
    'styles': {
        'padding': '10px 20px',
        'margin' : '0 auto'
    }    
}, {
    'click .link': function () {
        alert('Hello world!');
    }
});
```
Инициализация виджета будет иметь вид
```html
<script>
    jQuery(function ($) { // Классический document.ready
        $("#my-id").JBZooMyWidgett(); // просто убираем точки
    });
</script>
```
Другими словами, в название виджета, сначала указываете имя родительского виджета, далее через точку название своего
. Вложенность ничем не ограничена. Главное чтобы все родительские плагины были подключены выше.
```js
JBZoo.widget('JBZoo.MyWidget', {}, {});
JBZoo.widget('JBZoo.MyWidget.MyFormWidget', {}, {});
JBZoo.widget('JBZoo.MyWidget.MyFormWidget.OMG', {}, {});
JBZoo.widget('JBZoo.MyWidget.MyFormWidget.OMG.Bazinga', {}, {});

/**
 * Переопределение значений по умолчанию рекурсивное, поэтому
 * можно заменять данные как частично так и полностью.
 */
JBZoo.widget('JBZoo.MyWidget.MyFormWidget', {
    //  Простое переопределение опции по умолчанию, остальные будут унаследованы
    'text': 'Yuri Gagarin was the first man who had been in space',
    'styles': {
        'padding': '0' // Переопределим только одну вложенную опцию
    }
}, {
    // Если вам необходимо переопределить конструктор или любой другой метод - объявите его
    init: function () {
        // ... новый код
    },

    //  Переопределение события
    'click .link': function () {
        alert('Hello from Yuri Gagarin!');
    }
    
    setValue: function(newValue) { }
});
```

Инициализация виджета будет иметь вид
```html
<script>
    jQuery(function ($) {
        $("#my-id").JBZooMyWidgettMyFormWidget();
    });
</script>
```

##  Деструктор  - удаляем созданного виджета из документа
В нашей фабрике есть **деструктор** виджета, который необходим для деинициализации. Например, в какой то
определенный момент сценария необходимо удалить виджет...
```js
jQuery(function ($) {
    //  Инициализация виджета
    $("#my-id")
        .MyWidget({
            onDestroy: function() {} // Кастомный деструктор
        });
        .MyAnotherWidget({/* какие-то опции инициализации */});
    
    //  какой то код...
    
    //  Удаляем виджет и все его бинды событий. Это не повлияет на работу MyAnotherWidget, т.к. у них разные пространства имен
    $("#my-id").MyWidget('destroy');
});
```

Чуть выше был показан один из способов обращения к публичному методу `destroy`. Это может быть полезно для отладки виджета или прямого управления им из другого виджета без DOM-событий. Например, при разработке мы хотим посмотреть как отреагирует виджет, если будет вызван публичный метод с каким то аргументом. Для этого в консоли вы можете написать один из вариантов.
```js
$('#my-div').MyWidget('setValue', 50, 'secondArg');
$('#my-div').data('MyWidget').setValue(50, 'secondArg');
// Если он вдруг еще не инициализирован
$('#my-div').MyWidget().MyWidget('setValue', 50);
```


### Лицензия
MIT
