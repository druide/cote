var Requester = require('../').Requester;
var _ = require("lodash");

var randomRequest = new Requester({
    name: 'randomReq',
    // namespace: 'rnd',
    requests: ['randomRequest']
});

randomRequest.on('ready', function() {
    setInterval(function() {
        var req = {
            id: Date.now() + "-" + Math.floor(Math.random() * 1e10),
            type: 'randomRequest',
            val: ~~(Math.random() * 10)
        };

        var t = setTimeout(function () {
            var idx = _.findIndex(randomRequest.sock.queue, function (item) {
                return item[0].id === req.id;
            });
            if (idx !== -1) {
                randomRequest.sock.queue.splice(idx, 1);
                console.log("timeout");
            }
        }, 2000);

        randomRequest.send(req, function(res) {
            clearTimeout(t);
            console.log('request', req, 'answer', res);
        });
    }, 5000);

});
