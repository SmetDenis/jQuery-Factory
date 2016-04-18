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

    JBZoo.widget('JBZoo.Colors.Inherit',
        {
            'multiple': false,
            'type'    : 'radio',
            'recurse' : {
                'param1' : 'my-value'
            },
            onColorClick : function (widget, field) {}
        },
        {
            init: function () {
                this._onInit();
                this.el.find('input[type=' + this.options.type + ']:checked').next().addClass('checked');
            },

            'click .jbcolor-input': function (e, $this) {
                var $field = $(this);

                if ($.isFunction($this.options.onColorClick)) {
                    $this.options.onColorClick.apply($this, [$this, $field]);
                }

                if (!$this.options.multiple) {
                    if ($field.hasClass('wd-checked')) {
                        $field
                            .removeAttr('wd-checked')
                            .addClass('wd-unchecked')
                            .removeClass('wd-checked')
                            .next()
                            .removeClass('wd-checked');

                        $field.trigger('change');
                    } else {
                        $this.$('.jbcolor-input').removeClass('wd-checked');
                        $this.$('.jbcolor-label').removeClass('wd-checked');

                        $field
                            .attr('wd-checked', true)
                            .addClass('wd-checked')
                            .removeClass('wd-unchecked')
                            .next()
                            .addClass('wd-checked');
                    }
                } else {

                    if ($field.hasClass('wd-checked')) {
                        $field
                            .removeClass('wd-checked')
                            .next()
                            .removeClass('wd-checked');

                        $field.trigger('change');
                    } else {
                        $field
                            .addClass('wd-checked')
                            .next()
                            .addClass('wd-checked');
                    }

                }
            },

            _onInit: function () {
                this.el.prepend(
                    '<p class="widget-name">options.recurse.param1 = ' +
                        this.options.recurse.param1 +
                    '</p>');
            }
        }
    );

})(jQuery, window, document);
