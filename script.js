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
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
