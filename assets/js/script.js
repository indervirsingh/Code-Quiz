$(document).ready(function () {

    // display-div and buttons-div stored here for easy access
    var displayDiv = Document.querySelector("#display");
    var buttonsDiv = Document.querySelector("#buttons");

    // Keep track of user's score and the question they are on
    var score = 0, questionNumber = 0;

    // These are the questions that will be asked
    const quizQuestions = [ 
        "What is JavaScript?",
        "Which one of these is NOT a data type in Javascript?",
        "What grade should Indervir get on this quiz?"
    ];

    // Loop through each question and display it 
    for (let i = 0; i < quizQuestions.length; i++) {
        // keep the current question here for easy readability
        const currentQuestion = quizQuestions[i];

        
    }
})
