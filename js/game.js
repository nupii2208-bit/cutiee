/* =========================================================
   GAME PAGE
   game.js

   GAME 01 = Catch The Hearts
   GAME 02 = Memory Quiz
   GAME 03 = Mystery Cards
========================================================= */


/* =========================================================
   GAME 01
   CATCH THE HEARTS
========================================================= */

const startGameButton =
    document.getElementById(
        "startGame"
    );

const heartGame =
    document.getElementById(
        "heartGame"
    );

const gameScore =
    document.getElementById(
        "gameScore"
    );

const gameTimer =
    document.getElementById(
        "gameTimer"
    );

const gameResult =
    document.getElementById(
        "gameResult"
    );


let score = 0;
let timeLeft = 20;
let timerInterval = null;
let heartInterval = null;


if (
    startGameButton &&
    heartGame
) {

    startGameButton.addEventListener(
        "click",
        startHeartGame
    );

}


function startHeartGame() {

    clearInterval(
        timerInterval
    );

    clearInterval(
        heartInterval
    );


    heartGame.innerHTML =
        "";


    score = 0;
    timeLeft = 20;


    gameScore.textContent =
        "0";

    gameTimer.textContent =
        "20";


    gameResult.textContent =
        "";


    startGameButton.disabled =
        true;


    startGameButton.textContent =
        "Playing... 💖";


    heartInterval =
        setInterval(
            createHeart,
            500
        );


    timerInterval =
        setInterval(
            function () {

                timeLeft--;

                gameTimer.textContent =
                    timeLeft;


                if (
                    timeLeft <= 0
                ) {

                    endHeartGame();

                }

            },
            1000
        );

}


function createHeart() {

    if (!heartGame) {
        return;
    }


    const heart =
        document.createElement(
            "button"
        );


    heart.className =
        "game-heart";


    heart.type =
        "button";


    heart.textContent =
        "💖";


    heart.style.left =
        Math.random() * 90 + "%";


    heart.style.top =
        Math.random() * 80 + "%";


    heart.addEventListener(
        "click",
        function () {

            score++;

            gameScore.textContent =
                score;


            heart.remove();

        }
    );


    heartGame.appendChild(
        heart
    );


    setTimeout(
        function () {

            if (
                heart.parentNode
            ) {

                heart.remove();

            }

        },
        1200
    );

}


function endHeartGame() {

    clearInterval(
        timerInterval
    );

    clearInterval(
        heartInterval
    );


    heartGame.innerHTML =
        "";


    gameResult.textContent =
        `You caught ${score} hearts! ♡`;


    startGameButton.disabled =
        false;


    startGameButton.textContent =
        "Play Again ♡";

}


/* =========================================================
   GAME 02
   MEMORY QUIZ
========================================================= */


const quizQuestions = [

    {
        question:
            "When did we first meet? ✨",

        answers: [
            "8 June 2022",
            "3 January 2024",
            "17 February 2024"
        ],

        correct: 0,

        message:
            "Yes! 🥹 You remembered — 8 June 2022."
    },


    {
        question:
            "When did we become “us”? 💞",

        answers: [
            "8 June 2022",
            "17 February 2024",
            "3 January 2024"
        ],

        correct: 2,

        message:
            "You remembered! 💗 3 January 2024."
    },


    {
        question:
            "When was our first kiss? 🥹",

        answers: [
            "8 June 2022",
            "3 January 2024",
            "17 February 2024"
        ],

        correct: 2,

        message:
            "Aww… you remembered! 🥹 17 February 2022."
    }

];


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


let currentQuestion = 0;
let quizScore = 0;


if (
    quizQuestion &&
    quizOptions
) {

    showQuestion();


    if (nextQuestion) {

        nextQuestion.addEventListener(
            "click",
            nextQuizQuestion
        );

    }

}


function showQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    quizResult.textContent =
        "";


    /*
       Remove the previous sad reaction
       when a new question appears.
    */

    const oldReaction =
        document.getElementById(
            "quizSadReaction"
        );

    if (oldReaction) {

        oldReaction.remove();

    }


    if (nextQuestion) {

        nextQuestion.classList.add(
            "hidden"
        );

    }


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "quiz-option";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function checkAnswer(
    selectedIndex,
    selectedButton
) {

    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        quizOptions.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        /*
           CORRECT ANSWER
        */

        quizScore++;


        selectedButton.classList.add(
            "correct"
        );


        quizResult.textContent =
            question.message;


    } else {

        /*
           WRONG ANSWER
        */

        selectedButton.classList.add(
            "wrong"
        );


        /*
           Highlight the correct answer
        */

        buttons[
            question.correct
        ].classList.add(
            "correct"
        );


        /*
           Sad message
        */

        quizResult.textContent =
            "Aww… not that one 🥺💔 Try again!";


        /*
           Extra little sad reaction
        */

        showSadQuizReaction();

    }


    if (nextQuestion) {

        nextQuestion.classList.remove(
            "hidden"
        );


        if (
            currentQuestion ===
            quizQuestions.length - 1
        ) {

            nextQuestion.textContent =
                "Finish Quiz ♡";

        } else {

            nextQuestion.textContent =
                "Next Question →";

        }

    }

}


/* =========================================================
   SAD QUIZ REACTION
========================================================= */

function showSadQuizReaction() {

    let reaction =
        document.getElementById(
            "quizSadReaction"
        );


    /*
       Create the reaction only once
    */

    if (!reaction) {

        reaction =
            document.createElement(
                "div"
            );


        reaction.id =
            "quizSadReaction";


        reaction.className =
            "quiz-sad-reaction";


        reaction.setAttribute(
            "aria-live",
            "polite"
        );


        /*
           Put it directly below
           the quiz result
        */

        if (
            quizResult &&
            quizResult.parentNode
        ) {

            quizResult.parentNode.insertBefore(
                reaction,
                quizResult.nextSibling
            );

        }

    }


    reaction.textContent =
        "Aww… 🥺💔 It's okay, try the next one!";


    /*
       Restart animation every time
    */

    reaction.classList.remove(
        "show"
    );


    void reaction.offsetWidth;


    reaction.classList.add(
        "show"
    );

}


/* =========================================================
   NEXT QUIZ QUESTION
========================================================= */

function nextQuizQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        quizQuestions.length
    ) {

        showQuestion();

        return;

    }


    quizQuestion.textContent =
        "You finished our little memory test! ♡";


    quizOptions.innerHTML =
        "";


    quizResult.innerHTML =
        `
        You remembered
        <strong>${quizScore}</strong>
        out of
        <strong>${quizQuestions.length}</strong>
        memories. 🥹💞
        `;


    if (nextQuestion) {

        nextQuestion.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   GAME 03
   MYSTERY CARDS
========================================================= */


const mysteryCards =
    document.querySelectorAll(
        ".mystery-card"
    );


const resetCards =
    document.getElementById(
        "resetCards"
    );


const cardResult =
    document.getElementById(
        "cardResult"
    );


let cardAlreadySelected =
    false;


mysteryCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                if (
                    cardAlreadySelected
                ) {

                    return;

                }


                cardAlreadySelected =
                    true;


                card.classList.add(
                    "flipped"
                );


                mysteryCards.forEach(
                    function (otherCard) {

                        otherCard.disabled =
                            true;

                    }
                );


                if (cardResult) {

                    cardResult.textContent =
                        "A little message, just for you… 💌";

                }


                if (resetCards) {

                    resetCards.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }
);


if (resetCards) {

    resetCards.addEventListener(
        "click",
        function () {

            cardAlreadySelected =
                false;


            mysteryCards.forEach(
                function (card) {

                    card.classList.remove(
                        "flipped"
                    );


                    card.disabled =
                        false;

                }
            );


            if (cardResult) {

                cardResult.textContent =
                    "";

            }


            resetCards.classList.add(
                "hidden"
            );

        }
    );

}