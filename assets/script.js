// var timeEl = document.querySelector(".time");
// var secondsLeft = document.getElementById("choices").length;


// function setTime() {
//     var timerInterval = setInterval(function() {
//       secondsLeft--;
//       timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";
  
//       if(secondsLeft === 0) {
//         clearInterval(timerInterval);
//         sendMessage();
//       }
  
//     }, 1000);
// }
// function sendMessage() {
//     timeEl.textContent = " ";
// }


// document.getElementById("startQuiz").addEventListener("click", function(){
//     document.getElementById("home").className += " hide"


//   });
const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
let liveQuestion = {};
let takeAnswers = false;
let score = 0;
let questionNumber = 0;
let questionLog = [];
const questionCounterText = document.getElementById("question-counter");
const scoreText = document.getElementById("score");

let questions = [
  {
    question: "The $ is a symbol that references :",
    option1: "the cost of learning to code.",
    option2: "a Javascript library.",
    option3: "an ajax call.",
    option4: "a mathematical function",
    answer: 2
  },

  {
    question: "API stands for :",
    option1: "Access Parent Itteration.",
    option2: "Application Printer Interface.",
    option3: "Again, Possible Insanity.",
    option4: "Application Programming Interface.",
    answer: 4
  },

  {
    question: "The difference between var and let is :",
    option1: "var declares a variable while let accesses a function using the variable.",
    option2: "none; They are interchangeable.",
    option3: "scope. Let can only be accessed within the block of code where it is declared while var is global.",
    option4: "let is old and rarely used anymore.",
    answer: 3,
  },

  {
    question: "A boolean variable is :",
    option1: "either true or false.",
    option2: "a variable declaration exclusive to IOS.",
    option3: "a variable declaration exclusive to Windows OS.",
    option4: "more of a conditional statement than an actual variable.",
    answer: 1
  },

  {
    question: "What is an event in Javascript?",
    option1: "The annual JS convention in Vegas.",
    option2: "When APIs are used to pull information from a 3rd party.",
    option3: "Another way of describing a website being deployed.",
    option4: "When Javascript interacts with HTML.",
    answer: 4
  },

  {
    question: "Where is the Javascript placed inside an HTML file?",
    option1: "Within the <script> tags.",
    option2: "After id declarations but never class declarations.",
    option3: "After class declarations but never id declarations.",
    option4: "After the closing HTML tag.",
    answer: 1
  },

  {
    question: "Where is local storage actually stored?",
    option1: "In the cloud.",
    option2: "On a flash drive provided by the user.",
    option3: "Within the local storage of the user's device",
    option4: "It is a misleading term. You are actually supposed to write these things down.",
    answer: 3
  },

  {
    question: 'Using Jquery, which of the following is the same as: document.getElementById(/"testScore/");?',
    option1: '$(/"element.id/").testScore',
    option2: '$(/"document/").testScore',
    option3: '$(/".testScore/")',
    option4: '$(/"#testScore/")',
    answer: 4
  },

  {
    question: "What does HTML stand for?",
    option1: "Hyper Markup Language Text.",
    option2: "Hyper Text Markup Language.",
    option3: "Hypertrophy Muscle Lengthening.",
    option4: "Hypo Text Markup Language.",
    answer: 2
  },

  {
    question: "Javascript executes code :",
    option1: "All at the same time.",
    option2: "In reverse order.",
    option3: "Sequentially.",
    option4: "In the order dicated by HTML.",
    answer: 3
  },

];

const correctBonus = 10;
const questionsMax = 5;

quizStart = () => {
  questionNumber = 0;
  score = 0;
  questionLog = [...questions];
  console.log(questionLog);
  newQuestion();
};

newQuestion = () => {
  if (questionLog.length === 0 || questionNumber >= questionsMax) {
    localStorage.setItem("newScore", score);
    return window.location.assign("./end.html");
  };
  questionNumber++;
  questionCounterText.innerText = `${questionNumber}/${questionsMax}`;

  const questionIndex = Math.floor(Math.random() * questionLog.length);
  liveQuestion = questionLog[questionIndex];
  question.innerText = liveQuestion.question;

  options.forEach(option => {
    const number = option.dataset["number"];
    option.innerText = liveQuestion["option" + number];
  });

  questionLog.splice(questionIndex, 1);

  
  
  

  
  takeAnswers = true;
};

options.forEach(option => {
  option.addEventListener("click", e => {
    if(!takeAnswers) return;

    takeAnswers = false;
    const chosenAnswer = e.target;
    const selectedAnswer = chosenAnswer.dataset['number'];
    
    const classToApply = "incorrect";
      if (chosenAnswer == liveQuestion.answer) {
        classToApply = "correct";
      };

      if(classToApply === "correct"){
        incrementScore(correctBonus);
      };


    chosenAnswer.parentElement.classList.add(classToApply);
    
    console.log(selectedAnswer == liveQuestion.answer);
    
    setTimeout( () => {
      chosenAnswer.parentElement.classList.remove(classToApply);
      newQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

quizStart();