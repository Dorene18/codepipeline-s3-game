
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

    
     function startTimer() {
        const countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert('Time is up! Game over!');
            }
        }, 1000); // Update timer every second
    }
startButton.addEventListener('click', () => {
        if (countdown) {
            clearInterval(countdown); // Reset the timer if it's already running
        }
        timeLeft = 20; // Reset the time when the game starts
        timerDisplay.textContent = timeLeft; // Update the display
        createBoard(); // Start the game
    });
});
    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
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

    

    startButton.addEventListener('click', createBoard);
});
