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
            'type'    : 'radio'
        },
        {
            'click .jbcolor-input': function (e, $this) {

                var $field = $(this);

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
            }
        }
    );

})(jQuery, window, document);
