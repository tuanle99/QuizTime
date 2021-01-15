$(document).ready(function() {
    var initialTime = 75;
    var time = initialTime;
    var score = 0;
    var key = 0;

    var timerElement = document.getElementById('timer');
    var scoreElement = document.getElementById('score');

    function initialText() {
        $(".content").append("<h1 class='purple'>Coding Quiz Challenge</h1>");
    }
    function initialBtn() {
        var startGame = $("<div id='start'></div>");
        var startButton = $("<button class='start-button'>Start Quiz</button>")
        $(".content").append(startGame, [startButton]);
    }

    start_game();

    function start_game() {
        $(".content").empty();
        // $(".final-form").empty();
        // $(".final-container").empty();
        // $(".question-container").empty();
        $(':button').prop('disabled', false);
        initialText();
        initialBtn();
        score = 0;
        time = initialTime;
        timerElement.textContent = initialTime;

        $(".start-button").on("click", function(){
            timer = setInterval(function () {
                time--;
                if (time <= 0) {
                    timerElement.textContent = 0;
                } else {
                    timerElement.textContent = time;
                }
                if (time <= 0) {
                    final();
                    clearInterval(timer);
                }
            }, 1000)
            $(".content").empty();
            nextQuestion(0);
        });
    }
    
    var timer;

    function nextQuestion(q) {
        if (q < question.length && time > 0) {
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
                    score = score + 10;
                 } else {
                    $(".question-container").append("<p class='correct'> Incorrect </p>");
                    if (time > 5) {
                        time = time - 5;
                    } else {
                        time = 0;
                    }
                 }
                 $('.user-answer').prop('disabled', true);
                 setTimeout(function(){nextQuestion(q = q + 1)}, 1000);
            });
        } else {
            final();
        }
    }
    
    function final() {
        $(".content").empty();
        $(".content").append("<div class='container final-container'></div>");
        $(".final-container").append("<h1>Score: "+ score + "</h1>");
        var final_time = initialTime - time;
        if (time <= 0) {
            final_time = time;
            $(".final-container").append("<h1>Out Of Time</h1>");
        } else {
            $(".final-container").append("<h1>Time: "+ final_time + " seconds</h1>");
        }
        clearInterval(timer);
        $(".final-container").append("<input class='inline' id='name_input' type='text' placeholder='enter name'>");
        $(".final-container").append("<button class='inline start-button submit'>Submit</button>");
        $(".submit").on("click", function(){
            var name = $("#name_input").val();
            user_score(name);
        })
    }
    function user_score(name){
        name = name.charAt(0).toUpperCase() + name.slice(1);
        $(".content").empty();
        $(".content").append("<div class='container final-form'></div>");
        $(".final-form").append("<h1>" + name + "</h1>");
        $(".final-form").append("<h1>Score: "+ score + "</h1>");
        var final_time = initialTime - time;
        if (final_time >= initialTime) {
            final_time = "Out of Time";
        }
        if (final_time === 0 || final_time === "Out of Time") {
            $(".final-form").append("<h1>Out Of Time</h1>");
        } else {
            $(".final-form").append("<h1>Time: "+ final_time + " seconds</h1>");
        }
        $(".final-form").append("<button class='start-button spacing again'>Play Again</button>")
        $(".again").on("click", function(){
            start_game();
        })
        $(".final-form").append("<button class='start-button spacing save'>Save</button>")
        $(".save").on("click", function() {
            save_score(name, score);
        })
        $(".final-form").append("<button class='start-button spacing clear'>Clear Score</button>")
        $(".clear").on("click", function() {
            clear_score();
        })
    }
    function save_score(name, score){
        scoreElement.textContent = name + " - " + score;
    }
    function clear_score(){
        scoreElement.textContent = "";
        disabled_button();
    }
    function disabled_button() {
        $('.save').prop('disabled', true);
    }
});