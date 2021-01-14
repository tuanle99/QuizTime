$(document).ready(function() {
    var initialTime = 75;
    var time = initialTime;
    var score = 0;
    
    function initialText() {
        $(".content").append("<h1 class='purple'>Coding Quiz Challenge</h1>");
    }
    function initialBtn() {
        var startGame = $("<div id='start'></div>");
        var startButton = $("<button class='start-button'>Start Quiz</button>")
        $(".content").append(startGame, [startButton]);
    }

    initialText();
    initialBtn();

    var timerElement = document.getElementById('timer');
    timerElement.textContent = time;
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = score;

    var timer;

    $(".start-button").on("click", function(){
        timer = setInterval(function () {
            time--;
            timerElement.textContent = time;
            if (time === 0) {
                time_out();
                clearInterval(timer);
            }
        }, 1000)
        $(".content").empty();
        nextQuestion(0);
    });

    function nextQuestion(q) {
        if (q < question.length) {
            $(".content").empty();
            $(".content").append("<div class='container question-container'></div>");
            $(".question-container").append("<h1>"+ question[q].question + "</h1>");
            for (var i = 0; i < 4; i++) {
                var ansButton = $("<button>");
                ansButton.addClass("user-answer block");
                ansButton.text(question[q].answers[i]);
                $(".question-container").append(ansButton);
            }
            $(".user-answer").on("click", function(){
                var input = $(this).text();
                 if (input === question[q].correctAnswer) {
                    $(".question-container").append("<p class='correct'> Correct: "+ question[q].correctAnswer + "</p>");
                    score = score + 1;
                    scoreElement.textContent = score;
                 } else {
                    $(".question-container").append("<p class='correct'> Incorrect </p>");
                    score = score - 1;
                    scoreElement.textContent = score;
                 }
                 nextQuestion(q = q + 1);
            })
        } else {
            final();
        }
    }
    
    function final() {
        $(".content").empty();
        $(".content").append("<div class='container final-container'></div>");
        $(".final-container").append("<h1>Score: "+ score + "</h1>");
        var final_time = initialTime - time;
        $(".final-container").append("<h1>Time: "+ final_time + " seconds</h1>");
        clearInterval(timer);
    }
    function time_out() {
        $(".content").empty();
        $(".content").append("<div class='container final-container'></div>");
        $(".final-container").append("<h1>Score: "+ score + "</h1>");
        var final_time = initialTime - time;
        $(".final-container").append("<h1>Out of Time</h1>");
        clearInterval(timer);
    }
});