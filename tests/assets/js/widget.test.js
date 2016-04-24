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

    JBZoo.widget('JBZoo.Test', {},
        {
            init: function () {
                this.el.addClass('from-test-widget');
            },

            'click .jbcolor-label': function (e, $this) {
                if ($this.attr('id') === 'jbcolor-destroy') {
                    var $field = $(this);
                    alert($field.attr('for'));
                }
            }
        }
    );

})(jQuery, window, document);
