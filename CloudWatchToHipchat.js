var http = require('https');

var hipchatToken = 'xxxxxxxxxxxxxxxxxxx';
var hipchatRoom = '1111111';

exports.handler = function(event, context) {
    
    var  alarm = JSON.parse(event.Records[0].Sns.Message);
    //console.log(alarm);
    var snsMessage = '(' + alarm.AlarmName + '){' + alarm.NewStateValue + '} ' + alarm.NewStateReason;
    
    var hipchatColor = alarm.NewStateValue === 'ALARM' ? 'red' : 'green';
    
    var hipchatMessage = JSON.stringify({
        color: hipchatColor,
        message: snsMessage,
        notify: true,
        message_format: 'text',
    });
    
    console.log('hipchat message: ' + hipchatMessage);
    
    var httpOptions = {
        host: 'api.hipchat.com',
        port: 443,
        method: 'POST',
        path: '/v2/room/' + hipchatRoom + '/notification?auth_token=' + hipchatToken,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    var req = http.request(httpOptions, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        res.on('end', function () {
            console.log(res.statusCode);
            if (res.statusCode === 204) {
                console.log('success');
                context.succeed('message delivered to hipchat');
            } else {
                console.log('failed');
                context.fail('hipchat API returned an error');
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        context.fail('failed to deliver message to hipchat');
    });

    req.write(hipchatMessage);
    req.end();
};
