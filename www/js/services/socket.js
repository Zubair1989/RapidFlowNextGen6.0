angular.module('socket', [])

.factory('socket', function () {

    var getreturnedvalue; 
    var connection = new WebSocket("ws://az0181d.abbvienet.com"
           + "/WcfWSChatForWeb/WSChatService.svc");
    connection.onopen = function () {
        console.log("connected");
    };


    connection.sendMessage = function (methodName, parameterObj, $state) {
        if (connection.readyState == WebSocket.OPEN) {
            var payload = new Object();
            payload.methodName = methodName;
            payload.parameterObj = JSON.stringify(parameterObj);
            connection.send(JSON.stringify(payload));
            getreturnedvalue = $state;
       }
    }

    connection.onmessage = function (evt) {
        getreturnedvalue.go('app.playlists');
        console.log(evt.data);
       // var chatter = JSON.parse(evt.data);
       // addMessageToList(chatter.nickname, true, chatter.message);
    };
    connection.onerror = function (evt) {
        console.log(evt.message);
    };
    connection.onclose = function () {
        console.log("disconnected");
    };

    return connection;
});