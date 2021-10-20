const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const guessedLetters = [];
const word = "magnolia";
//console.log(word);

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
    } else if (input.length > 1)  {
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
        guessedLetters.push (guess);
    }
};

console.log(guessedLetters);