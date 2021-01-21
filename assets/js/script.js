/* VARIABLES */

    // This is created HERE for scope purposes, so I can reference submitButton globally
    var submitButton = $("<button>");
    submitButton.addClass("btn btn-success btn-lg submit-button");
    submitButton.text("SUBMIT QUIZ");

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
                localStorage.setItem("score", score);
            }
            else {
                // Take 5 seconds off timer for wrong answers
                seconds -= 5;
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
        // prevButton.hide();

        // Stop the timer since we are done
        clearInterval(timer);

        // Get the user's score from storage
        var endScore = localStorage.getItem("score");

        // Create a new div to display results
        var results = $("<div>");
        results.addClass("results");

        // Add the text to display
        results.text("SCORE: " + endScore + " out of 5");

        // Append this div to HTML page
        resultsDiv.append(results);
    };

    var clearScreen = function () {
        displayDiv.empty();
        buttonsDiv.empty();
    }

    startButton.on("click", function () {
        // Clear the localStorage of any stored data, this is the START of a new quiz
        localStorage.clear();
        // Hide the start button as well as the quiz prompt
        promptDiv.hide();
        startButton.hide();

        // Make sure to enable the next button, enabling the user to go to next question
        document.getElementById("next").disabled = false; 

        // Create the timer
        var timer = setTimeout(updateTimer, 1000);
        timerDiv.text("Time Remaining: " + seconds);
        loadQuestion(quizQuestions[questionNumber], questionNumber);
    });

    /* SAVE IN CASE NEEDED LATER

    prevButton.on("click", function () {
        // Decrement number to get correct index
        questionNumber--;

        // Clear the screen of everything first
        clearScreen();

        // Now load the previous question
        loadQuestion(quizQuestions[questionNumber], questionNumber);
    });

    */

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



