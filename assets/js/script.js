$(document).ready(function () {

    // display-div stored here for easy access
    var displayDiv = Document.querySelector("#display");

    // Keep track of user's score and the question they are on
    var score = 0, questionNumber = 0;

    // These are the questions that will be asked
    const quizQuestions = [ 
        "What is JavaScript?",
        "Which one of these is NOT a data type in Javascript?",
        "What grade should Indervir get on this quiz?"
    ];


    // All functions here

    var loadQuestion = function (question, questionNumber) {

        // Create a new div which displays the current question
        var questionDiv = $("<div>");
        questionDiv.addClass("question");
        questionDiv.text(question);

        // Now add this div to the actual HTML page
        displayDiv.append(questionDiv);
    }















    // Loop through each question and display it 
    for (let i = 0; i < quizQuestions.length; i++) {

        // Keep the current question here for easy readability
        const currentQuestion = quizQuestions[i];

        // This function is where the questions will be loaded
        loadQuestion(currentQuestion, i);






    };

    var displayQuestion = function(questionNumber) {

    };
});
