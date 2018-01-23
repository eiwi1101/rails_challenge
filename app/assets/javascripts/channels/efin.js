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
            console.log(data);
            $('#efin').text(data.body);
        }
    });

    $("form").on("submit", function (e) {
        e.preventDefault();

        var data = {};
        var $button = $(this).find('button[type=submit]');

        FormUtils.disableButton($button);

        $(this).serializeArray().map(function (x) {
            data[x.name] = x.value;
        });

        App.efin.send(data);
    });
});
