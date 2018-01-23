$(function () {
    var channelInfo = {
        channel: "EfinChannel",
        userToken: "foobar"
    };

    App.efin = App.cable.subscriptions.create(channelInfo, {
        connected: function () {
            console.log('Connected to EFIN server.');
        },

        disconnected: function () {
            console.log('Disconnected from EFIN server.');
        },

        received: function (data) {
            var $form   = $('form');
            var $button = $form.find('button[type=submit]');

            switch(data.status) {
                case 'error':
                    FormUtils.alert($form, 'error', data.error);
                    FormUtils.addErrors($form, data.errors);
                    FormUtils.enableButton($button);
                    break;

                case 'processing':
                    break;

                case 'processed':
                    FormUtils.clearAlerts($form);

                    FormUtils.alert($form, 'info', "EFIN Calculated", "Your EFIN has been calculated " +
                        "successfully. Please keep this number for your records.");

                    FormUtils.showResult($form, data.efin);
                    break;

                default:
                    FormUtils.alert($form, 'Invalid response from server');
                    FormUtils.enableButton($button);
                    console.error("Invalid response:", data);
            }
        }
    });

    $("form").on("submit", function (e) {
        e.preventDefault();

        var data = {};
        var $button = $(this).find('button[type=submit]');

        FormUtils.clearAlerts($(this));
        FormUtils.clearErrors($(this));
        FormUtils.disableButton($button);

        $(this).serializeArray().map(function (x) {
            data[x.name] = x.value;
        });

        App.efin.send(data);
    });

    $("form").find("#resetBtn").on("click", function(e) {
        e.preventDefault();
        var $form = $(this).parents("form");

        console.log($form);

        $form[0].reset();

        FormUtils.hideResult($form, function() {
            $form.find('[autofocus]').focus();
        });
    });
});
