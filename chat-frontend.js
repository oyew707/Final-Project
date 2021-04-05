// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

$ ( function () {
   // "use strict";
    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var target = $('#target');
    var status = $('#status');
    var Top_Left = $('#Top_Left');
    var Top_Center = $('#Top_Center');
    var Top_Right = $('#Top_Right');
    var Middle_Left = $('#Middle_Left');
    var Middle_Center = $('#Middle_Center');
    var Middle_Right = $('#Middle_Right');
    var Bottom_Left = $('#Bottom_Left');
    var Bottom_Center = $('#Bottom_Center');
    var Bottom_Right = $('#Bottom_Right');
    var board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;
    var pastMove = false;

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }

    var url = new URL(window.location.href);
    var room_id = url.searchParams.get("room");
    // open connection
    var connection = new WebSocket('ws://'+window.location.hostname+':6789/?room_id='+room_id);

    connection.onopen = function () {
        input.removeAttr('disabled');
        status.text('Choose name:');
        console.log(document.cookie);
        var username = readCookie(document.cookie.toString());
        connection.send(username);
        myName = username;
        // input.text(username);
        // input.keydown();
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'color') { // first response from the server with user's color
            myColor = json.data;
            status.text(myName + ': ').css('color', myColor);
            input.removeAttr('disabled').focus();
            if(myColor == "blue"){
                target.text("Your Move");
            }
            else{
                target.text("Opponents Move");
            }
            // from now user can start sending messages
        } else if (json.type === 'history') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text,
                           json.data[i].color, new Date(json.data[i].time));
            }
        } else if (json.type === 'message') { // it's a single message
            input.removeAttr('disabled'); // let the user write another message
            if (json.data.text.includes("_")){
                if (pastMove == json.data.color){
                    if(pastMove == myColor){
                        alert("Not Your Move");
                    }  
                }
                else{
                    $('#'.concat(json.data.text)).css('background', json.data.color);
                    if (json.data.text == "Top_Left"){
                        board[0][0] = json.data.color;
                        Top_Left.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Top_Center"){
                        board[0][1] = json.data.color;
                        Top_Center.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Top_Right"){
                        board[0][2] = json.data.color;
                        Top_Right.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Middle_Left"){
                        board[1][0] = json.data.color;
                        Middle_Left.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Middle_Center"){
                        board[1][1] = json.data.color;
                        Middle_Center.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Middle_Right"){
                        board[1][2] = json.data.color;
                        Middle_Right.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Bottom_Left"){
                        board[2][0] = json.data.color;
                        Bottom_Left.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Bottom_Center"){
                        board[2][1] = json.data.color;
                        Bottom_Center.attr('disabled', 'disabled');
                    }
                    else if (json.data.text == "Bottom_Right"){
                        board[2][2] = json.data.color;
                        Bottom_Right.attr('disabled', 'disabled');
                    }
                    pastMove = json.data.color;
                    var win = Test_Win(board)
                    console.log(win);
                    if(win == false){
                        if(pastMove == myColor){
                            target.text("Opponents Move");
                        }
                        else{
                            target.text("Your Move");
                        }
                    }
                    else if (win == "Draw"){
                        target.text(win);
                        Top_Left.attr('disabled', 'disabled');
                        Top_Center.attr('disabled', 'disabled');
                        Top_Right.attr('disabled', 'disabled');
                        Middle_Left.attr('disabled', 'disabled');
                        Middle_Center.attr('disabled', 'disabled');
                        Middle_Right.attr('disabled', 'disabled');
                        Bottom_Left.attr('disabled', 'disabled');
                        Bottom_Center.attr('disabled', 'disabled');
                        Bottom_Right.attr('disabled', 'disabled');
                        setTimeout(Reset_Board, 4000);
                    }
                    else{
                        Top_Left.attr('disabled', 'disabled');
                        Top_Center.attr('disabled', 'disabled');
                        Top_Right.attr('disabled', 'disabled');
                        Middle_Left.attr('disabled', 'disabled');
                        Middle_Center.attr('disabled', 'disabled');
                        Middle_Right.attr('disabled', 'disabled');
                        Bottom_Left.attr('disabled', 'disabled');
                        Bottom_Center.attr('disabled', 'disabled');
                        Bottom_Right.attr('disabled', 'disabled');
                        console.log(json.data);
                        target.text(json.data.author.concat(" Wins by ", win))
                        setTimeout(Reset_Board, 4000);
                    }
                }
            }else{
                addMessage(json.data.author, json.data.text,
                    json.data.color, new Date(json.data.time));
            }

        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    /**
     * Send mesage when user presses Enter key
     */
    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
            // send the message as an ordinary text
            connection.send(msg);
            $(this).val('');
            // disable the input field to make the user wait until server
            // sends back response
            input.attr('disabled', 'disabled');

            // we know that the first message sent from a user their name
            if (myName === false) {
                myName = msg;
            }
        }
    });

    Top_Left.click(function(e) {
        var msg = "Top_Left";
        connection.send(msg);
    });

    Top_Center.click(function(e) {
        var msg = "Top_Center";
        connection.send(msg);
    });

    Top_Right.click(function(e) {
        var msg = "Top_Right";
        connection.send(msg);
    });

    Middle_Left.click(function(e) {
        var msg = "Middle_Left";
        connection.send(msg);
    });

    Middle_Center.click(function(e) {
        var msg = "Middle_Center";
        connection.send(msg);
    });

    Middle_Right.click(function(e) {
        var msg = "Middle_Right";
        connection.send(msg);
    });

    Bottom_Left.click(function(e) {
        var msg = "Bottom_Left";
        connection.send(msg);
    });

    Bottom_Center.click(function(e) {
        var msg = "Bottom_Center";
        connection.send(msg);
    });

    Bottom_Right.click(function(e) {
        var msg = "Bottom_Right";
        connection.send(msg);
    });

    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
            status.text('Error');
            input.attr('disabled', 'disabled').val('Unable to comminucate '
                                                 + 'with the WebSocket server.');
        }
    }, 3000);

    /**
     * Add message to the chat window
     */
    function addMessage(author, message, color, dt) {
        content.prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }

    function Test_Win(board){
        var win = false
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[2][2] != false){
            win = "Diagonal Right"
        }
        else if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != false){
            win = "Diagonal Left"
        }
        else if(board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[2][1] != false){
            win = "Vertical Middle"
        }
        else if(board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[2][0] != false){
            win = "Vertical Left"
        }
        else if(board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[2][2] != false){
            win = "Vertical Right"
        }
        else if(board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][2] != false){
            win = "Horitzontal Top"
        }
        else if(board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][2] != false){
            win = "Horitzontal Middle"
        }
        else if(board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][2] != false){
            win = "Horitzontal Bottom"
        }

        if (win == false){
            for(var i = 0; i < board.length; i++) {
                var row = board[i];
                for(var j = 0; j < row.length; j++) {
                    if (row[j] == false){
                        return win;
                    }
                }
            }
            win = "Draw";
        }
        return win
    }

    function Reset_Board(){
        board = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ];
        Top_Left.css('background', "white");
        Top_Center.css('background', "white");
        Top_Right.css('background', "white");

        Middle_Left.css('background', "white");
        Middle_Center.css('background', "white");
        Middle_Right.css('background', "white");

        Bottom_Left.css('background', "white");
        Bottom_Center.css('background', "white");
        Bottom_Right.css('background', "white");

        if(pastMove == myColor){
            target.text("Opponents Move");
        }
        else{
            target.text("Your Move");
        }

        Top_Left.removeAttr('disabled');
        Top_Center.removeAttr('disabled');
        Top_Right.removeAttr('disabled');
        Middle_Left.removeAttr('disabled');
        Middle_Center.removeAttr('disabled');
        Middle_Right.removeAttr('disabled');
        Bottom_Left.removeAttr('disabled');
        Bottom_Center.removeAttr('disabled');
        Bottom_Right.removeAttr('disabled');
    }

    function readCookie(d) {
        let ca =d.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i].trim();
            if (c.startsWith("usertic")){
                var da = c.split("=");
                var value = decodeURIComponent(da[1]).split(".")
                return value[0].substring(2, value[0].length);
            }
            console.log(c);
        }
        return null;
    }
});

