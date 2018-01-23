window.FormUtils = {
    disableButton: function($button, disableWith) {
        if(typeof disableWith === 'undefined')
            disableWith = ($button.data('disable-text') || 'Processing...');

        // $button
        //     .attr('disabled', true)
        //     .addClass('ds-c-button--disabled')
        //     .data('submit-text', $button.text())
        //     .text(disableWith);
    },

    enableButton: function($button, enableWith) {
        if(typeof enableWith === 'undefined')
            enableWith = ($button.data('submit-text') || 'Submit');

        $button
            .attr('disabled', false)
            .removeClass('ds-c-button--disabled')
            .data('submit-text', $button.text())
            .text(enableWith);
    }
};
