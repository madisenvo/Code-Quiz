// variables defined
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
const submitBtn = document.getElementById('submitBtn')
const timerEl = document.getElementById('time')
const wrongAnswer = document.getElementById('wrong-answer')
const correctAnswer = document.getElementById('correct-answer')
const finalScore = document.getElementById('score')
var timeLeft = 60
var timeElapsed = 0
var initialsEl = document.getElementById('initials-input').value
var currentScore = 0
let shuffledQuestions, currentQuestionIndex


// shows high scores when "view high scores" is clicked
viewScores.addEventListener('click', showScores)

// adds clicke event to start button & resets timer
startButton.addEventListener('click', function(){
  startGame();
  startTimer();
  timeLeft = 60;
  timeElapsed = 0;
})

// questions for the quiz
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

// shuffles and shows question
function startGame(){
  landingPage.classList.add('hide')
  questionContainerEl.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
}

// makes answers into buttons
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

// hides start button and resets answer buttons
function resetState(){
  startButton.classList.add('hide')
  while (answerButtonsEl.firstChild){
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

// presents randomized question
function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}


// clears status of answers
function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// gives answer chosen a correct or wrong class
function setStatusClass(element, correct){
  clearStatusClass(element)
  if (correct){
    element.classList.add('correct')
  } else{
    element.classList.add('wrong')
  }
}

//sets and updates timer
function startTimer() {
  timerEl.textContent = timeLeft;
  interval = setInterval(function () {
      timeElapsed++;
      timerEl.textContent = timeLeft - timeElapsed;
    }, 1000);
}

//stops timer
function stopTimer() {
  clearInterval(interval);
}

// shows final score
function scoresPage(){
  questionContainerEl.classList.add('hide')
  correctAnswer.classList.add('hide')
  wrongAnswer.classList.add('hide')
  saveScoreEl.classList.remove('hide')
  finalScore.textContent = currentScore
}

// targets selected answer, shows correct/wrong message, adds points for a correct selection, subtracts time for incorrect selection, continues or stops quiz
function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if(correct){
    currentScore ++
    console.log(currentScore)
    correctAnswer.classList.remove('hide')
    wrongAnswer.classList.add('hide')
  }else{
    timeElapsed += 10
    wrongAnswer.classList.remove('hide')
    correctAnswer.classList.add('hide')
  }
  
  if(shuffledQuestions.length > currentQuestionIndex + 1){ 
    currentQuestionIndex++
    setNextQuestion()
  } else{
    stopTimer()
    setTimeout(scoresPage, 1000)
  }
}


// shows list of user scores
function showScores(){
  questionContainerEl.classList.add('hide')
  saveScoreEl.classList.add('hide')
  landingPage.classList.add('hide')
  correctAnswer.classList.add('hide')
  wrongAnswer.classList.add('hide')
  highScores.classList.remove('hide')
}

// creates button functionality that takes user to start of quiz
goBackBtnEl.addEventListener('click', function(){
  currentScore = 0;
  highScores.classList.add('hide');
  landingPage.classList.remove('hide');
  startButton.classList.remove('hide');
})


// click of button adds user initials and score to list
submitBtn.addEventListener('click', function(){
  var yourScore = document.getElementById('initials-input').value + ' ' + currentScore;

  console.log(initialsEl)
  console.log(currentScore)
  console.log(`your score is ${yourScore}`);

  var li = document.createElement("li");
  li.innerHTML = yourScore;
  document.getElementById("userList").appendChild(li);

  $('input[type="text"]').val("");
})

//Clears scores from high scores list
clearBtnEl.addEventListener("click", function () {
  document.getElementById("userList").innerHTML = '';
});