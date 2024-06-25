let alphabet = "azertyuiopqsdfghjklmwxcvbn";
let tab = alphabet.split('')
let words = ["hibernate", "billboard", "crumble", "questioningly", "judgementally", "vastly", "yum", "congratulate", "excepting", "knowledgeably", "indeed", "surprisingly", "miserably", "inside", "beatiful", "lovingly", "fuck", "poor", "finally", "sleepily", "thoughtfully"]
const hangmanImages = [
    './assets/imgs/pendu0.png',
    './assets/imgs/pendu1.png',
    './assets/imgs/pendu2.png',
    './assets/imgs/pendu3.png',
    './assets/imgs/pendu4.png',
    './assets/imgs/pendu5.png',
    './assets/imgs/pendu6.png',
    './assets/imgs/pendu7.png'
];
let hiddenWord;
let lives = 7
let attempts = 0
const keyboard = document.getElementById('keyboard');
const container = document.querySelector('.gameContainer');
const startButton = document.getElementById('start');
const replayButton = document.getElementById('replay');
const hangmanImage = document.getElementById('hangman-image');
hangmanImage.style.display = `none`

function updateHangmanImage() {
    let hangmanImage = document.querySelector('#hangman-image');
    hangmanImage.src = hangmanImages[7 - lives];
}

function createKeyboard() {
    keyboard.innerHTML = '';
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'keyboardbutton';
        button.dataset.letter = letter;
        button.addEventListener('click', () => {
            if (!button.classList.contains('used')) {
                let letter = getInput(button.dataset.letter);
                compare(letter);
                button.classList.add('used');
                attempts++;
                document.querySelector('.attempts').textContent = `Attempts : ${attempts}`;
            }
        });
        keyboard.appendChild(button);
    });
}

addEventListener("keypress", (event) => {
    let btns = document.querySelectorAll(".keyboardbutton");
    btns.forEach(btn => {
        if (btn.innerHTML.toLowerCase() == event.key.toLowerCase() && !btn.classList.contains('used')) {
            btn.click();
        }
    });
});

function compare(letter) {
    let wordArray = chosenWord.split('');
    let hiddenWordArray = hiddenWord.split(' ');
    let isLetterInWord = false;

    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i].toLowerCase() === letter.toLowerCase()) {
            hiddenWordArray[i] = wordArray[i];
            isLetterInWord = true;
        }
    }

    if (isLetterInWord) {
        document.querySelector('.lives').textContent = `lives : ${lives}`;
    } else {
        lives--;
        document.querySelector('.lives').textContent = `Lives : ${lives}`;
        updateHangmanImage()
        if (lives === 0) {
            document.querySelector('.word').textContent = chosenWord;
            document.querySelector('.result').textContent = `lol nope it was : ${chosenWord}`;
            document.querySelector('.result').style.color = "red";
            disableKeyboard();
        }
    }

    hiddenWord = hiddenWordArray.join(' ');
    document.querySelector('.word').textContent = hiddenWord;

    if (!hiddenWord.includes('-')) {
        document.querySelector('.result').textContent = 'Nice !';
        document.querySelector('.result').style.color = "green";
        disableKeyboard();
    }
}

function disableKeyboard() {
    let btns = document.querySelectorAll(".keyboardbutton");
    btns.forEach(btn => btn.disabled = true);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideWord(word) {
    hiddenWord = word.split('').map(letter => (letter === ' ' ? ' ' : '-')).join(' ');
    document.querySelector('.word').textContent = hiddenWord;
}

function initGame() {
    lives = 7;
    attempts = 0;
    chosenWord = words[random(0, words.length - 1)];
    hideWord(chosenWord);
    document.querySelector('.attempts').textContent = `Attempts : ${attempts}`;
    document.querySelector('.lives').textContent = `Lives : ${lives}`;
    document.querySelector('.result').textContent = '';
    createKeyboard();
}

function startGame() {
    initGame();
    startButton.style.display = "none";
    replayButton.style.display = 'block';
    updateHangmanImage()
    hangmanImage.style.display = `block`
}

function replay() {
    initGame();
    updateHangmanImage();
}

function getInput(letter) {
    return letter;
}