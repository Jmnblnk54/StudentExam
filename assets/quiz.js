const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What goes inside square brackets []?",
        choice1: "Link to another page",
        choice2: "Array",
        choice3: "Object",
        choice4: "Variable Declaration",
        answer: 2
    },
    {
        question: "To insert a JavaScript into an HTML page, which tag is used?",
        choice1: "<script='java'>",
        choice2: "<javascript>",
        choice3: "<script>",
        choice4: "<js>",
        answer: 3
    },
    {
        question: "Which of the following is a server-side Java Script object?",
        choice1: "Function",
        choice2: "File",
        choice3: "FileUpload",
        choice4: "Date",
        answer: 2
    },
    {
        question: "Which of the following means 'or'?",
        choice1: "&&",
        choice2: "=>",
        choice3: "||",
        choice4: "<=",
        answer: 3
    },
    {
        question: " How does Java Script store dates in objects of Date type?",
        choice1: "The number of days since January 1st, 1900",
        choice2: "The number of seconds since January 1st, 1970",
        choice3: "The number of milliseconds since January 1st, 1970",
        choice4: "The number of picoseconds since January 1st, 1970",
        answer: 3
    },
    {
        question: "JavaScript ignores:",
        choice1: "bad coders",
        choice2: "special characters",
        choice3: "white space",
        choice4: "yellow space",
        answer: 3
    },
    {
        question: "How do we write 'Hello World' in an alert box?",
        choice1: "alertBox('Hello World')",
        choice2: "box('Hello World')",
        choice3: "alert('Hello World')",
        choice4: "('Hello World').alertBox",
        answer: 3
    },
    {
        question: "Which is the correct way to write a JavaScript array?",
        choice1: "var txt = ['kim', 'jim']",
        choice2: "var txt = new Array:1=(' arr ')2=('kim')3=('jim')",
        choice3: "var txt = new Array('arr ','kim','jim')",
        choice4: "var txt = new Array= ' arr ','kim','jim'",
        answer: 1
    },
    {
        question: "Which of the following can you not declare as a variable?",
        choice1: "jumpButton",
        choice2: "document",
        choice3: "facePalm",
        choice4: "tenTimes",
        answer: 2
    },
    {
        question: "Which language gives a website functionality?",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "Github",
        choice4: "JavaScript",
        answer: 4
    },
    {
        question: "Which of the following is an IF statement in JavaScript?",
        choice1: "if i = 5",
        choice2: "if i = 5 then",
        choice3: "if (i == 5)",
        choice4: "All of these",
        answer: 3
    },
    {
        question: "Which of the following is a comment in JavaScript?",
        choice1: "<-This one->",
        choice2: "//This one",
        choice3: "/*This one*/",
        choice4: "%This one%",
        answer: 2
    },
    {
        question: "What does css stand for?",
        choice1: "cache static styles",
        choice2: "cascading sheets styled",
        choice3: "crazy super styling",
        choice4: "cascading style sheets",
        answer: 4
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        choice1: "$",
        choice2: "=",
        choice3: "()",
        choice4: "#",
        answer: 2
    },
    {
        question: "What is the difference between HTTP and HTTPS?",
        choice1: "There is no difference.",
        choice2: "One is plural, the other singular.",
        choice3: "The 'S' stands for Secure.",
        choice4: "HTTPS is outdated and rarely used.",
        answer: 3
    },

]

//CONSTANTS

const correctBonus = 10;
const maxQuestions = 10;
const incorrectPenalty = -10;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    console.log (availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        localStorage.setItem('mostRecentScore', score);
        //GO TO THE END PAGE
        return window.location.assign("./end.html");
    }

    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + maxQuestions;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === 'correct') {
            incrementScore(correctBonus);
        }else {
            decreaseTimer(incorrectPenalty);
        }
        

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
        

        
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

decreaseTimer = num => {
    timer -= 10;
    timer.innerText = timer;
}

startQuiz(); 