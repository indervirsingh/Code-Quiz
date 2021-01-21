/* VARIABLES */

    // display-div and buttons-div, etc stored here for easy access
    var displayDiv = $("#display");
    var buttonsDiv = $("#buttons");
    var promptDiv = $("#prompt");
    var startButton = $("#start");

    // Keep track of user's score
    var score = 0, questionNumber = 0;

    // These are the questions that will be asked
    const quizQuestions = [ 

        "What is JavaScript?",
        "Which one of these is NOT a data type in Javascript?",
        "What grade should Indervir get on this quiz?"
    ];

    // Each index has 3 choices, which should correlate to the index of quizQuestions
    const choices = [

        ["Modern Programming Language", "Java Knock Off", "Ice Cream"],
        ["Boolean", "String", "Function"],
        ["F", "A", "D"]

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
            if ((choiceValue === "ModernProgrammingLanguage") || (choiceValue === "Function") || (choiceValue === "A")) {
                score++;
            }
            else {
                // take time off timer
            };
        });



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
        }
        
    });








/* END-FUNCTIONS */



