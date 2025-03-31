const wordList = [];
let selectedWord = "";
let hiddenWord = "";
const maxAttempts = 6;
let attemptsLeft = maxAttempts;


//HTML
const wordDisplay = document.getElementById("wordDisplay");
const messageDisplay = document.getElementById("messageDisplay");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const attemptsDisplay = document.getElementById("attemptsDisplay");



//API kelime çekme işi

function fetchWordsFromAPI() {
    fetch("words.json")
        .then((response) => response.json())
        .then((data) => {
            wordList.push(...data);
            startGame();
        })
        .catch((error) => {
            console.error("Kelimeler yüklenemedi:", error);
        });
}

function startGame() {
    console.log(messageDisplay);
    if (wordList.length === 0) {
        messageDisplay.textContent = "Kelime listesi bulunmadı";
        return;
    }

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    hiddenWord = "_".repeat(selectedWord.length);

    attemptsLeft = maxAttempts;
    wordDisplay.textContent = hiddenWord.split("").join(" ");
    attemptsDisplay.textContent = `Kalan Hak: ${attemptsLeft}`;
    messageDisplay.textContent = "Tahmin etmeye başlayabilirsiniz";
}

function guessLetter() {
    const guessedLetter = guessInput.value.toLowerCase();

    if (!guessedLetter || guessedLetter.length !== 1) {
        messageDisplay.textContent = "Lütfen bir harf girin!";
        return;
    }
    let newHiddenWord = "";
    let isCorrectGuess = false;

    // Tahmine dilen harfi tahmin etme işi
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newHiddenWord += guessedLetter;
            isCorrectGuess = true;
        } else {
            newHiddenWord += hiddenWord[i];
        }
    }
    hiddenWord = newHiddenWord;
    wordDisplay.textContent = hiddenWord.split("").join(" ");

    if (isCorrectGuess) {
        messageDisplay.textContent = "Doğru tahmin";
    } else {
        attemptsLeft--;
        attemptsDisplay.textContent = `Kalan Hak: ${attemptsLeft}`;
        messageDisplay.textContent = "Yanlış Tahmin";
    }

    // Oyunu kontrol etme işi
    if (!hiddenWord.includes("_")) {
        messageDisplay.textContent = `Tebrikler kelimeyi buldunuz: ${selectedWord}`;
        guessButton.disabled = true;
        document.body.style.backgroundColor = "green";
    } else if (attemptsLeft === 0) {
        messageDisplay.textContent = `Kaybettiniz kelime: ${selectedWord}`;
        guessButton.disabled = true;
        document.body.style.backgroundColor = "red";
    }

    guessInput.value = "";
}

//API fetchleme
fetchWordsFromAPI();

//guessletter görevi yükleme butona
guessButton.addEventListener("click", guessLetter);

//enter tuşu da olsun
guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        guessLetter();
    }
});


//Yeniden başlatma

document.getElementById("restartButton").addEventListener("click", startGame);

restartButton.addEventListener("click", () => {
    startGame();
    document.body.style.backgroundColor = "white";
    guessButton.disabled = false;
});

