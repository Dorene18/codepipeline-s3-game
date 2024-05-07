
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
     const timerDisplay = document.getElementById('time-left');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
     let timeLeft = 20;
    let countdown;

    const cardArray = [
        { name: 'card1', img: 'images/1 (2).png' },
        { name: 'card2', img: 'images/2.png' },
        { name: 'card3', img: 'images/3.jpeg' },
        { name: 'card4', img: 'images/cloudfront.jpeg' },
        { name: 'card5', img: 'images/5.jpeg' },
        { name: 'card6', img: 'images/6.png' },
        { name: 'card7', img: 'images/7.png' },
        { name: 'card8', img: 'images/8.jpeg' },
        { name: 'card9', img: 'images/9.jpeg' },
        { name: 'card10', img: 'images/10.png' },
        // ...add more pairs as needed
    ];
    let currentFlashcardIndex = 0;
    function createBoard() {
        displayFlashcard(currentFlashcardIndex);
        startTimer();
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
function displayFlashcard(index) {
    const flashcard = flashcards[index];
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');

    questionElement.textContent = flashcard.question;
    optionsContainer.innerHTML = '';

    flashcard.options.forEach((option, i) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', () => {
            checkAnswer(option);
        });
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const flashcard = flashcards[currentFlashcardIndex];
    const correctAnswer = flashcard.correctAnswer;

    if (selectedOption === correctAnswer) {
        alert('Congratulations! You chose the correct answer.');
        nextFlashcard();
    } else {
        alert(`Incorrect. The correct answer is ${correctAnswer}.`);
        nextFlashcard();
    }
}

function nextFlashcard() {
    currentFlashcardIndex++;
    if (currentFlashcardIndex < flashcards.length) {
        displayFlashcard(currentFlashcardIndex);
    } else {
        alert('Congratulations! You have completed all the flashcards.');
    }
}
function startTimer() {
    let timeLeft = 20;
    const timerDisplay = document.getElementById('time-left');

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert('Time is up! The correct answer is: ' + flashcards[currentFlashcardIndex].correctAnswer);
            nextFlashcard();
        }
    }, 1000); // Update timer every second
}
    document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        const selectedOption = option.textContent;
        checkAnswer(selectedOption);
    });
});
