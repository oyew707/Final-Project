$ ( function () {
    var myColor = "blue";
    var pastMove = false;

    var target = $('#target');
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
    var alg;
    if(window.location.href.includes("game_dave2.html")){
        alg = "minimax";
    }else{
        alg = "rl";
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

    function Reset_Board() {
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

        Top_Left.removeAttr('disabled');
        Top_Center.removeAttr('disabled');
        Top_Right.removeAttr('disabled');
        Middle_Left.removeAttr('disabled');
        Middle_Center.removeAttr('disabled');
        Middle_Right.removeAttr('disabled');
        Bottom_Left.removeAttr('disabled');
        Bottom_Center.removeAttr('disabled');
        Bottom_Right.removeAttr('disabled');

        if (pastMove == myColor) {
            target.text("Dave's Move: might take a minute");
            daves_move();
        } else {
            target.text("Your Move");
        }
    }

    Top_Left.click(function(e) {
        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Top_Left.css('background', myColor);
            board[0][0] = myColor;
            Top_Left.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Top_Center.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Top_Center.css('background', myColor);
            board[0][1] = myColor;
            Top_Center.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Top_Right.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Top_Right.css('background', myColor);
            board[0][2] = myColor;
            Top_Right.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Middle_Left.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Middle_Left.css('background', myColor);
            board[1][0] = myColor;
            Middle_Left.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Middle_Center.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Middle_Center.css('background', myColor);
            board[1][1] = myColor;
            Middle_Center.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Middle_Right.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Middle_Right.css('background', myColor);
            board[1][2] = myColor;
            Middle_Right.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Bottom_Left.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Bottom_Left.css('background', myColor);
            board[2][0] = myColor;
            Bottom_Left.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Bottom_Center.click(function(e) {

        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Bottom_Center.css('background', myColor);
            board[2][1] = myColor;
            Bottom_Center.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }
    });

    Bottom_Right.click(function(e) {
        if (pastMove == myColor){
            alert("Wait for your turn cheater");
        }else{
            Bottom_Right.css('background', myColor);
            board[2][2] = myColor;
            Bottom_Right.attr('disabled', 'disabled');
            pastMove = myColor;
            var w = checkWin();
            if (w == false){
                daves_move();
            }
        }

    });


    function checkWin(){
        var win = Test_Win(board)
        console.log(win);
        if(win == false){
            if(pastMove == myColor){
                target.text("Daves Move");
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
            var auth = "Dave" ;
            if (pastMove == myColor){
                auth = "You"
            }
            target.text(auth.concat(" Wins by ", win))
            setTimeout(Reset_Board, 4000);
        }
        return win;
    }


    function daves_move(n1, n2) {
        var xhttp = new XMLHttpRequest();
        var b = board_to_str();
        var query = "rundavescript?alg=" + alg + "&board=" + b;
        xhttp.open("GET", query, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var rest_ans =  this.responseText;
                rest_ans = rest_ans.replace("[", "");
                rest_ans = rest_ans.replace("]", "");
                rest_ans = rest_ans.split(",")
                rest_ans[0] =  parseInt(rest_ans[0]);
                rest_ans[1] =  parseInt(rest_ans[1]);
                board[rest_ans[0]][rest_ans[1]] = "black";
                pastMove = "black";

                if (rest_ans[0] == 0 && rest_ans[1] == 0){
                    Top_Left.css('background', "black");
                    Top_Left.attr('disabled', 'disabled');
                    checkWin();
                }else if (rest_ans[0] == 0 && rest_ans[1] == 1){
                    Top_Center.css('background', "black");
                    Top_Center.attr('disabled', 'disabled');
                    checkWin()
                }else if (rest_ans[0] == 0 && rest_ans[1] == 2){
                    Top_Right.css('background', "black");
                    Top_Right.attr('disabled', 'disabled');
                    checkWin();
                }else if (rest_ans[0] == 1 && rest_ans[1] == 0){
                    Middle_Left.css('background', "black");
                    Middle_Left.attr('disabled', 'disabled');
                    checkWin()
                }else if (rest_ans[0] == 1 && rest_ans[1] == 1){
                    Middle_Center.css('background', "black");
                    Middle_Center.attr('disabled', 'disabled');
                    checkWin()
                }else if (rest_ans[0] == 1 && rest_ans[1] == 2){
                    Middle_Right.css('background', "black");
                    Middle_Right.attr('disabled', 'disabled');
                    checkWin()
                }else if (rest_ans[0] == 2 && rest_ans[1] == 0){
                    Bottom_Left.css('background', "black");
                    Bottom_Left.attr('disabled', 'disabled');
                    checkWin();
                }else if (rest_ans[0] == 2 && rest_ans[1] == 1){
                    Bottom_Center.css('background', "black");
                    Bottom_Center.attr('disabled', 'disabled');
                    checkWin();
                }else{
                    Bottom_Right.css('background', "black");
                    Bottom_Right.attr('disabled', 'disabled');
                    checkWin();
                }
            }
        }
        xhttp.send(null);
    }

    function board_to_str(){
        var to_r = "";
        for(var i = 0; i < board.length; i++) {
            var row = board[i];
            for(var j = 0; j < row.length; j++) {
                if (row[j] == false){
                    to_r = to_r + "n_";
                }else if(row[j] == myColor){
                    to_r = to_r + "x_";
                }else{
                    to_r = to_r + "y_";
                }
            }
        }
        return to_r.slice(0,-1);
    }


    function sum_ajax(keyEvent) {
        var n1 = document.getElementById("num1").value;
        var n2 = document.getElementById("num2").value;
        if (parseFloat(n1) && parseFloat(n2)) {
            getSum(n1, n2);
        } else {
            var targetDiv = document.getElementById("target");
            targetDiv.innerHTML = "Invalid input";
        }
    }


});