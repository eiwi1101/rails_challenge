window.FormUtils = {
    disableButton: function($button, disableWith) {
        if(typeof disableWith === 'undefined')
            disableWith = ($button.data('disable-text') || 'Processing...');

        $button
            .attr('disabled', true)
            .addClass('ds-c-button--disabled')
            .data('submit-text', $button.text())
            .text(disableWith);
    },

    enableButton: function($button, enableWith) {
        if(typeof enableWith === 'undefined')
            enableWith = ($button.data('submit-text') || 'Submit');

        $button
            .attr('disabled', false)
            .removeClass('ds-c-button--disabled')
            .data('submit-text', $button.text())
            .text(enableWith);
    },

    alert: function($form, level, title, message) {
        var $alerts = $form.find('.alerts');
        var container = $('<div class="ds-c-alert ds-c-alert--' + level + ' ds-u-margin-bottom--3"/>');
        var body = $('<div class="ds-c-alert__body"/>');
        var heading = $('<h3 class="ds-c-alert__heading"/>');
        var text = $('<p class="ds-c-alert__text"/>');

        heading.text(title).appendTo(body);

        if(typeof message !== 'undefined')
            text.text(message).appendTo(body);

        body.appendTo(container);
        container.appendTo($alerts);
        $form.find('[autofocus]').focus();
    },

    clearAlerts: function($form) {
        var $alerts = $form.find('.alerts');
        $alerts.empty();
    },

    showError: function($form, field, error) {
        var $field = $form.find('#' + field);
        var $container = $field.parent();
        var errorMessage = $('<span class="ds-c-field__hint ds-u-color--error error"/>');

        errorMessage.text(error).appendTo($container);
        $field.addClass('ds-c-field--error');
    },

    clearErrors: function($form) {
        var $fields = $form.find('.ds-c-field--error');

        $fields.each(function() {
            var $field = $(this);
            var $container = $field.parent();

            $field.removeClass('ds-c-field--error');
            $container.find('.ds-c-field__hint.error').remove();
        });
    },

    addErrors: function($form, errors) {
        if(typeof errors === 'undefined') return;
        var _this = this;
        var focused = false;

        $.each(errors, function (field, error) {
            console.log(field, error);
            _this.showError($form, field, error);

            if(!focused) {
                $form.find('#' + field).focus();
                focused = true
            }
        });
    },

    showResult: function($form, result) {
        var $main = $form.find('.main-input');
        var $result = $form.find('.result');

        $result.find('.efin').text(result);
        $main.hide();
        $result.slideDown();
    },

    hideResult: function($form, callback) {
        var $main = $form.find('.main-input');
        var $result = $form.find('.result');
        var $button = $form.find('button[type=submit]');

        FormUtils.clearAlerts($form);
        FormUtils.clearErrors($form);
        FormUtils.enableButton($button);

        $result.hide();
        $main.slideDown(callback);
    }
};
