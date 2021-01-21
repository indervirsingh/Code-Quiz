/* VARIABLES */

    // display-div and buttons-div, etc stored here for easy access
    var displayDiv = $("#display");
    var buttonsDiv = $("#buttons");
    var promptDiv = $("#prompt");
    var resultsDiv = $("#results");
    var nextButton = $("#next");
    var startButton = $("#start");

    // Keep track of user's score
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
        questionDiv.text(question);


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



        $(".choice-button").on("click", function () {

            var choiceValue = ($(this).attr("id"));

            // This is if the user selects a correct answer
            if ((choiceValue === "ModernProgrammingLanguage") || (choiceValue === "Function") || (choiceValue === "While") || (choiceValue === "intx=2;") || (choiceValue === "ObjectOrientedProgramming")) {
                score++;
                localStorage.setItem("score", score);
            }
            else {
                // take time off timer
            };
        });



    };

    var loadResults = function () {

        // Get the user's score from storage
        var endScore = localStorage.getItem("score");

        // Create a new div to display results
        var results = $("<div>");
        results.addClass("results");

        // Add the text to display
        results.text("SCORE: " + endScore);

        // Append this div to HTML page
        resultsDiv.append(results);

        // REMEMBER TO CLEAR THE STORAGE
        localStorage.clear();
    };

    startButton.on("click", function () {
        promptDiv.hide();
        startButton.hide();
        document.getElementById("next").disabled = false; 
        loadQuestion(quizQuestions[questionNumber], questionNumber);
    });

    nextButton.on("click", function () {

        // Increment number to get next index in array
        questionNumber++;

        // First clear the screen then load the next question
        displayDiv.empty();
        buttonsDiv.empty();

        // If there is a next question, continue, otherwise disable next button
        if (questionNumber < quizQuestions.length) {
            loadQuestion(quizQuestions[questionNumber], questionNumber);
        }
        else {

            nextButton.hide();
            // Show results

            loadResults();

        }
        
    });








/* END-FUNCTIONS */



