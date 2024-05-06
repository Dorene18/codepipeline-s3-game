// script.js

// Array of flashcards with questions and answers
const flashcards = [
  { question: "Question 1?", answer: "Answer 1" },
  { question: "Question 2?", answer: "Answer 2" },
  // Add more flashcards here...
];

function flipCard(index) {
  const card = document.getElementsByClassName('flashcard')[index];
  card.classList.add('flipped');
  clearInterval(timerInterval); // Stop the timer when the card is flipped
  document.getElementById('congrats').style.display = 'block';
}

function displayFlashcards() {
  const flashcardsContainer = document.getElementById('flashcards-container');
  
  // Populate flashcards
  flashcards.forEach((flashcard, index) => {
    const card = document.createElement('div');
    card.classList.add('flashcard');
    card.innerText = flashcard.question;
    card.onclick = function() { flipCard(index); };
    flashcardsContainer.appendChild(card);
  });
}

// Call the function to display flashcards
displayFlashcards();
