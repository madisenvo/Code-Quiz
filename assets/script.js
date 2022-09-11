const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById('question-container')
const landingPage = document.getElementById('landing')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const saveScoreEl = document.getElementById('save-score')
const viewScores = document.getElementById('view-scores')
const highScores = document.getElementById('high-scores')
const goBackBtnEl = document.getElementById('go-back')
const clearBtnEl = document.getElementById('clear-scores')
const timerEl = document.getElementById('time')
var timeLeft = 10
var secondsElapsed = 0
var initialsEl = $('input[name="initials"]');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', startTimer)
viewScores.addEventListener('click', showScores)



const questions = [
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    answers: [
      {text: '1. Commas', correct: false},
      {text: '2. Curly brackets', correct: false},
      {text: '3. Quotes', correct: true},
      {text: '4. Parenthesis', correct: false}
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
      {text: '1. JavaScript', correct: false},
      {text: '2. Terminal/bash', correct: false},
      {text: '3. For loops', correct: false},
      {text: '4. Console.log', correct: true},
    ]
  },
  {
    question: 'Commonly used data types do NOT include:',
    answers: [
      {text: '1. Strings', correct: false},
      {text: '2. Booleans', correct: false},
      {text: '3. Alerts', correct: true},
      {text: '4. Numbers', correct: false},
    ]
  },
  {
    question: 'The condition in an if/else statement is enclosed with ______.',
    answers: [
      {text: '1. Quotes', correct: false},
      {text: '2. Curly brackets', correct: false},
      {text: '3. Parenthesis', correct: true},
      {text: '4. Square brackets', correct: false},
    ]
  }
]

function startGame(){
  landingPage.classList.add('hide')
  questionContainerEl.classList.remove('hide')
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

//timer
function startTimer() {
  timerEl.textContent = timeLeft;
  interval = setInterval(function () {
      secondsElapsed++;
      timerEl.textContent = timeLeft - secondsElapsed;
    }, 1000);
}
//stops timer
function stopTimer() {
  clearInterval(interval);
}

function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(shuffledQuestions.length > currentQuestionIndex + 1){
    currentQuestionIndex++
    setNextQuestion()
  } else{
    stopTimer()
    questionContainerEl.classList.add('hide')
    saveScoreEl.classList.remove('hide')
  }
}

function showScores(){
  questionContainerEl.classList.add('hide')
  saveScoreEl.classList.add('hide')
  landingPage.classList.add('hide')
  highScores.classList.remove('hide')
}

goBackBtnEl.addEventListener('click', function(){
  highScores.classList.add('hide')
  landingPage.classList.remove('hide')
  startButton.classList.remove('hide')
})

// //Clears saved scores from local storage
// clearScoresBtnEl.addEventListener("click", function () {
//   highScores = [];
//   localStorage.setItem("scores", JSON.stringify(highScores));
//   renderHighScores();
// });