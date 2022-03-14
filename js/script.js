const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDisplay = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let guessedLetters = [];
let word = "magnolia";
let remainingGuesses = 8;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//Start the game
getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Empty message paragrapgh
  message.innerText = "";
  //Grab what was entered in the input
  const guess = letterInput.value;
  //Let's make sure that it's a single letter
  const goodGuess = validate(guess);

  if (goodGuess) {
    makeGuess(goodGuess);
  }
  //console.log(guess);
  letterInput.value = "";
  validate(guess);
});

const validate = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Oops!  Just one letter per guess! Try Again.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Oops!  Please enter a letter from A to Z :)";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "Oops! You've already guessed that letter!";
  } else {
    guessedLetters.push(guess);
    countGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

//console.log(guessedLetters);

const showGuessedLetters = function () {
  //clear the list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

//Replaces the circles with correct letters
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  //console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWon();
};

const countGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (upperWord.includes(guess)) {
    message.innerText = `Good guess!  ${guess} is in the word.`;
  } else {
    message.innerText = `Sorry, ${guess} is not in the word.`;
    remainingGuesses -= 1;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWon = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  remainingGuessesDisplay.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  //reset all original values - grab new word
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  //Get a new word
  getWord();

  //show the right UI elements
  guessButton.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  remainingGuessesDisplay.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
