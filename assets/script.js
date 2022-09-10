const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById('question-container')
const landingPage = document.getElementById('landing')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

const questions = [
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    answers: [
      {text: '1. commas', correct: false},
      {text: '2. curly brackets', correct: false},
      {text: '3. quotes', correct: true},
      {text: '4. parenthesis', correct: false}
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
      {text: '1. JavaScript', correct: false},
      {text: '2. terminal/bash', correct: false},
      {text: '3. for loops', correct: false},
      {text: '4. console.log', correct: true},
    ]
  },
  {
    question: 'Commonly used data types do NOT include:',
    answers: [
      {text: '1. strings', correct: false},
      {text: '2. booleans', correct: false},
      {text: '3. alerts', correct: true},
      {text: '4. numbers', correct: true},
    ]
  },
  {
    question: 'The condition in an if/else statement is enclosed with ______.',
    answers: [
      {text: '1. quotes', correct: false},
      {text: '2. curly brackets', correct: false},
      {text: '3. parenthesis', correct: true},
      {text: '4. square brackets', correct: true},
    ]
  }
]

function startGame(){
  landingPage.classList.add('hide');
  questionContainerEl.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
}

function showQuestion(question){
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}

function resetState(){
  startButton.classList.add('hide')
  while (answerButtonsEl.firstChild){
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}
function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function setStatusClass(element, correct){
  clearStatusClass(element)
  if (correct){
    element.classList.add('correct')
  } else{
    element.classList.add('wrong')
  }
}
function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

}


























// // Selects element by class
// var timeEl = document.querySelector(".time");

// var secondsLeft = 60;

// function setTime() {
//   // Sets interval in variable
//   var timerInterval = setInterval(function() {
//     secondsLeft--;
//     timeEl.textContent = "Time: " + secondsLeft;

//     if(secondsLeft === 0) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// }

