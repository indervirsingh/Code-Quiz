$(document).ready(function () {


/* VARIABLES */

    // display-div stored here for easy access
    var displayDiv = $("#display");

    // Keep track of user's score and the question they are on
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
            choice.addClass("choices");

            // Add the text to the button
            choice.text(currentChoice);

            // Add the button to the display-div so it shows on screen
            displayDiv.append(choice);

        }


    };












    // Loop through each question and display it 
    for (let questionNumber = 0; questionNumber < quizQuestions.length; questionNumber++) {

        // Keep the current question here for easy readability
        const currentQuestion = quizQuestions[questionNumber];

        // This function will display the question on screen
        loadQuestion(currentQuestion, questionNumber);

        // This function will display the correlating choices on screen
        loadChoices(questionNumber);

        // Create conditions





    };


});
