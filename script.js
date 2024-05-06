// script.js
let timeLeft = 10; // Initial time for the timer
let timerInterval; // Interval variable to hold the timer
let currentQuestionIndex = 0; // Index of the current question being displayed

// Array of questions and answers
const questions = [
  { question: "Question 1?", answer: "Answer 1" },
  { question: "Question 2?", answer: "Answer 2" },
  // Add more questions here...
];

function startTimer() {
  timerInterval = setInterval(function() {
    document.getElementById('time-left').innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      revealAnswer();
    } else {
      timeLeft--;
    }
  }, 1000);
}

function flipCard() {
  const card = document.getElementById('flashcard');
  card.classList.add('flipped');
  clearInterval(timerInterval); // Stop the timer when the card is flipped
  document.getElementById('congrats').style.display = 'block';
}

function revealAnswer() {
  // Display the correct answer
  document.getElementById('flashcard').innerText = questions[currentQuestionIndex].answer;
}

function displayQuestion() {
  // Display the current question
  document.getElementById('question').innerText = questions[currentQuestionIndex].question;
}

function nextQuestion() {
  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    resetGame();
  } else {
    // End of the game, you can handle this as per your requirement
    alert("Congratulations! You've completed all questions.");
  }
}

function resetGame() {
  timeLeft = 10; // Reset the timer
  startTimer(); // Start the timer for the new question
  document.getElementById('flashcard').innerText = "Click to reveal answer";
  document.getElementById('flashcard').classList.remove('flipped');
  document.getElementById('congrats').style.display = 'none';
}

// Start the game
displayQuestion();
startTimer();
