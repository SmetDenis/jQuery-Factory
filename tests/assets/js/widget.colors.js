/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license JBZoo Licence
 */


;
(function ($, window, document, undefined) {

    JBZoo.widget('JBZoo.Colors',
        {
            'multiple': true,
            'type'    : 'radio',
            'recurse' : {
                'param1' : 'value-1',
                'param2' : 'value-2',
                'param3' : 'value-3'
            }
        },
        {
            init: function () {
                this._onInit();
                this.el.find('input[type=' + this.options.type + ']:checked').next().addClass('checked');
            },

            'click {element}': function () {
                var elem = $(this);
                if (!elem.hasClass('by-click-element')) {
                    elem.addClass('by-click-element');
                }
            },

            'click {document} .title-jbzoo-colors': function () {
                var elem = $(this);
                if (!elem.hasClass('by-click-doc-element')) {
                    elem.addClass('by-click-doc-element');
                }
            },

            'click .jbcolor-input': function (e, $this) {
                var $field = $(this);

                if (!$this.options.multiple) {
                    if ($field.hasClass('checked')) {
                        $field
                            .removeAttr('checked')
                            .addClass('unchecked')
                            .removeClass('checked')
                            .next()
                            .removeClass('checked');

                        $field.trigger('change');
                    } else {
                        $this.$('.jbcolor-input').removeClass('checked');
                        $this.$('.jbcolor-label').removeClass('checked');

                        $field
                            .attr('checked', true)
                            .addClass('checked')
                            .removeClass('unchecked')
                            .next()
                            .addClass('checked');
                    }
                } else {

                    if ($field.hasClass('checked')) {
                        $field
                            .removeClass('checked')
                            .next()
                            .removeClass('checked');

                        $field.trigger('change');
                    } else {
                        $field
                            .addClass('checked')
                            .next()
                            .addClass('checked');
                    }

                }
            },

            _onInit: function () {
                this.el.prepend(
                    '<p class="widget-name">options.recurse.param1 = ' +
                        this.options.recurse.param1 +
                    '</p>');

                this.el.prepend('<p class="widget-name">widget init id: #' + this.el.attr('id') + '</p>');
            }
        }
    );

})(jQuery, window, document);
