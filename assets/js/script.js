/* VARIABLES */

    // Create the high score list
    var highestScoresDiv = $("<div>");
    highestScoresDiv.addClass("highest-scores");

    // This is created HERE for scope purposes, so I can reference submitButton globally
    var submitButton = $("<button>");
    submitButton.addClass("btn btn-success btn-lg submit-button");
    submitButton.text("SUBMIT QUIZ");

    // Create a input where the user can save their score, at the end
    var initialInput = $("<input id=\"initialID\">");
    initialInput.addClass("initialInput");

    // Create a previous button, to go back from the scores to the main menu
    var previousButton = $("<button>");
    previousButton.addClass("btn btn-secondary")
    previousButton.text("Go Back");

    // Create the saveScore button
    var saveButton = $("<button>");
    saveButton.addClass("btn btn-success btn-lg save-button");
    saveButton.text("SAVE SCORE");


    // display-div, buttons-div, etc stored here for easy access
    var displayDiv = $("#display");
    var buttonsDiv = $("#buttons");
    var promptDiv = $("#prompt");
    var resultsDiv = $("#results");
    var timerDiv = $("#timer");

    // 60 seconds in timer
    var seconds = 60;

    // 2 buttons which are hard coded
    var nextButton = $("#next");
    var startButton = $("#start");
    var resetButton = $("#reset-button");
    // var prevButton = $("#previous");

    // Keep track of user's score and which question they are on
    var score = 0, questionNumber = 0;

    // These are the questions that will be asked
    const quizQuestions = [ 

        "What is JavaScript?",
        "Which one of these is NOT a data type in Javascript?",
        "Which one of these is a type of loop?",
        "Which one of these is NOT the correct way to declare variable in Javascript?",
        "What does OOP stand for?"
    ];

    // Each index has 3 choices, which should correlate to the index of quizQuestions
    const choices = [

        ["Modern Programming Language", "Java Knock Off", "Ice Cream"],
        ["Boolean", "String", "Function"],
        ["While", "AND", "Modulus"],
        ["int x = 2;", "const myVar;", "let myVar = \"hello world\";"],
        ["Only On Python", "Object Oriented Programming", "Omega Oatmeal Plan"]

    ];




/* END-VARIABLES */


/* FUNCTIONS */

    var loadQuestion = function (question, questionNumber) {

        // Create a new div which displays the current question
        var questionDiv = $("<div>");

        // Add a class to it, for later styling use
        questionDiv.addClass("questions");

        // Add the question text
        questionDiv.text(questionNumber+1 + "." + question);


        // Now add this div to the actual HTML page
        displayDiv.append(questionDiv);

        // Now load the choices
        loadChoices(questionNumber);
    };

    var loadChoices = function (questionNumber) {

        // Create some choices using buttons
        // This loop will iterate 3 times, because only 3 choices
        // It will only iterate on the subarray of the correlating question/choice
        // EX: if questionNumber 2, loop through the 3 choices on choices[2]
        for (let i = 0; i < 3; i++) {

            // This is the actual choice text
            var currentChoice = choices[questionNumber][i];

            // Create a button which represents each choice
            var choice = $("<button>");

            // Add a class to it, for later styling use
            choice.addClass("choice-button btn btn-primary");

            // Add the text to the button
            choice.text(currentChoice);

            // Delete spaces first, if there are any
            currentChoice = currentChoice.replace(/\s+/g, '');

            // Add an ID so it can be differentiated from other wrong/correct answers
            choice.attr("id", currentChoice);


            // Add the button to the buttons-div so it shows on screen
            buttonsDiv.append(choice);
            buttonsDiv.append("<br>");



        };



        // Needs to be HERE due to scope of "choice-button"
        $(".choice-button").on("click", function () {
            // Disable the other choices
            disableChoices();

            // This will hold what the user selected
            var choiceValue = ($(this).attr("id"));

            // This is if the user selects a correct answer
            if ((choiceValue === "ModernProgrammingLanguage") || (choiceValue === "Function") || (choiceValue === "While") || (choiceValue === "intx=2;") || (choiceValue === "ObjectOrientedProgramming")) {
                score++;
                //localStorage.setItem("score", score);

                // Show user they got it right
                isRight(choiceValue);
            }
            else {
                // Take 5 seconds off timer for wrong answers
                seconds -= 5;

                // Notify user they got it wrong
                isWrong(choiceValue, questionNumber);
            };


        });



    };

    var disableChoices = function (choiceValue) {
        // Go through all the choice-buttons, disable all
        var buttons = document.querySelectorAll(".choice-button");

        for (let i = 0; i < 3; i++) {
            const currentButton = buttons[i];
            currentButton.disabled = true;
        }

        // Also disable previousButton since we aren't allowed multiple tries
        // document.getElementById("previous").disabled = true;
    };

    var loadResults = function () {
        // Clear everything on screen besides the results
        clearScreen();

        // Stop the timer since we are done
        clearInterval(timer);

        // Create a new div to display results
        var results = $("<div>");
        results.addClass("results");

        // Add the text to display
        results.text("SCORE: " + score + " out of 5");

        // Append this div to HTML page
        resultsDiv.append(results);

        // Add the input area where user can enter their initials
        resultsDiv.append("<span id=\"initials\">Initials: </span>");
        resultsDiv.append(initialInput);

        // Add the saveButton
        resultsDiv.append("<br>")
        resultsDiv.append(saveButton);
        resultsDiv.show();
    };

    var loadHighestScore = function () {
        // Get the last saved highest score
        var userString = localStorage.getItem("user");
        var userObject = JSON.parse(userString);
        var initial = userObject.initials;
        var score = userObject.score;

        clearScreen();
        promptDiv.hide()
        resultsDiv.hide();
        startButton.hide();
        nextButton.hide();

        // Display the highest score
        displayDiv.append("<h3 class=\"highest-scores\" >HIGH-SCORE</h3>");
        highestScoresDiv.text("1. " + initial + " - " + score);
        displayDiv.append(highestScoresDiv);

        // Add the previous button, to get back to main prompt
        previousButton.show();
        buttonsDiv.append("<br>", previousButton);

    };

    var clearScreen = function () {
        displayDiv.empty();
        buttonsDiv.empty();
    }

    var isRight = function(choiceValue) {
        // Say You're Right!
        alert("Your answer \"" + choiceValue + "\"  was correct!");
    };

    var isWrong = function (choiceValue, questionNumber) {
        var correctAnswer = "";
        switch (questionNumber) {
            case 0:
                correctAnswer = choices[0][0];
                break;
            case 1:
                correctAnswer = choices[1][2];
                break;
            case 2:
                correctAnswer = choices[2][0];
                break;
            case 3:
                correctAnswer = choices[3][0];
                break;
            case 4:
                correctAnswer = choices[4][1];
                break;
        };
        alert("Your answer: " +  choiceValue + "\n Correct answer: " + correctAnswer);

    };

    startButton.on("click", function () {
        // Clear the localStorage of any stored data, this is the START of a new quiz
        // localStorage.clear();
        // Hide the start button as well as the quiz prompt
        promptDiv.hide();
        startButton.hide();
        nextButton.show();
        displayDiv.show();

        // Make sure to enable the next button, enabling the user to go to next question
        document.getElementById("next").disabled = false; 

        
        // THIS ALLOWS THE RESET
        seconds = 60;
        questionNumber = 0;
        
        // Create the timer
        var timer = setTimeout(updateTimer, 1000);
        timerDiv.text("Time Remaining: " + seconds);
        loadQuestion(quizQuestions[questionNumber], questionNumber);
    });


    previousButton.on("click", function () {
        // First I need to hide the previous button and highscores
        highestScoresDiv.empty();
        previousButton.hide();
        displayDiv.empty();
        resultsDiv.empty();

        // I will unhide everything and display the main menu
        promptDiv.show();
        startButton.show();

    });


    nextButton.on("click", function () {
        // Increment number to get next index in array
        questionNumber++;

        // Only allow enable the prevButton if there is a previous question there
        // Ex: CAN'T PREVIOUS ON QUESTION 1
        // if (questionNumber > 0) {
        //     document.getElementById("previous").disabled = false;
        // }


        // First clear the screen then load the next question
        clearScreen();

        // Load the next question,
        // This condition makes sure the questions are in order, error handling etc.
        if (questionNumber < quizQuestions.length) {
            loadQuestion(quizQuestions[questionNumber], questionNumber);
        }

        // This is a special condition which only happens on the last question
        if (questionNumber === quizQuestions.length - 1) {
            // Hide the next question button and append the submitButton to HTML page
            nextButton.hide();

            // I created the button above with the other variables, but it has not been added yet until now
            buttonsDiv.append("<br>");
            buttonsDiv.append(submitButton);
        };

    });

    submitButton.on("click", function () {
        // Since this is the last question, we just go to results
        loadResults();
    });

    saveButton.on("click", function() {

        var input = document.querySelector("#initialID");
        // Create user object to store high-score
        var user = {
            initials: input.value.trim(),
            score: score
        };

        // Save score/user
        localStorage.setItem("user", JSON.stringify(user));


        loadHighestScore();
    });

    // resetButton.on("click", function () {
    //     window.location.reload("./script.js");
    //     return false;
    // });

    var updateTimer = function() {

        if (seconds > 0) {
            timerDiv.text("Time Remaining:" + --seconds);
            timer = setTimeout(updateTimer, 1000);
        }
        else {
            alert("TIMES UP!!");
            nextButton.hide();
            loadResults();
        };
    };


/* END-FUNCTIONS */



