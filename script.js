
// ======================================
// QUESTIONS
// ======================================

const SUPABASE_URL =
    "https://wtdahhtubqeotxdlvblw.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZGFoaHR1YnFlb3R4ZGx2Ymx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjEwNDgsImV4cCI6MjEwNTgzNzA0OH0.HxgdicPvbITB5zpAYw-eYL-ZadbwueD3QS5SaK3rLO0";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );




const questions = [

    {
        question: "Would you go on a date with me?",
        type: "single",

        options: [
            "Yes, definitely ❤️",
            "No 😭"
        ]
    },

    {
        question: "What would you like our first date to be like?",
        type: "multiple",

        max: 3,

        options: [
            "Nice restaurant 🍽️",
            "Cinema 🎬",
            "Sunset date 🌅",
            "Cute café ☕",
            "Night out 🌃"
        ]
    },

    {
        question: "What food would you like?",
        type: "multiple",

        max: 3,

        options: [
            "Pizza 🍕",
            "Burgers 🍔",
            "Chicken 🍗",
            "Pasta 🍝",
            "Ice cream 🍦"
        ]
    },

    {
        question: "What would you like us to do together?",
        type: "multiple",

        max: 3,

        options: [
            "Watch a movie 🎬",
            "Eat together 🍽️",
            "Take a walk 🚶",
            "Take pictures 📸",
            "Play games 🎮"
        ]
    },

    {
        question: "What would make the date special for you?",
        type: "multiple",

        max: 2,

        options: [
            "Flowers 🌹",
            "Cute pictures 📸",
            "A surprise gift 🎁",
            "Deep conversations 💕"
        ]
    },

    {
        question: "One last question...",
        type: "single",

        options: [
            "I'm excited ❤️",
            "I can't wait 🥰"
        ]
    }

];


// ======================================
// VARIABLES
// ======================================

let currentQuestion = 0;

let answers =
    JSON.parse(
        localStorage.getItem("dateAnswers")
    ) || {};


// ======================================
// ELEMENTS
// ======================================

const homeScreen =
    document.getElementById("homeScreen");

const questionScreen =
    document.getElementById("questionScreen");

const finalScreen =
    document.getElementById("finalScreen");

const startBtn =
    document.getElementById("startBtn");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const selectionHint =
    document.getElementById("selectionHint");

const optionsContainer =
    document.getElementById("optionsContainer");

const progressBar =
    document.getElementById("progressBar");

const backBtn =
    document.getElementById("backBtn");

const continueBtn =
    document.getElementById("continueBtn");

const finalSummary =
    document.getElementById("finalSummary");


// ======================================
// START QUESTIONNAIRE
// ======================================






startBtn.addEventListener("click", () => {

    // Start a fresh questionnaire
    answers = {};

    localStorage.removeItem("dateAnswers");
    localStorage.removeItem("dateResult");

    currentQuestion = 0;

    homeScreen.classList.remove("active");

    questionScreen.classList.add("active");

    finalScreen.classList.remove("active");

    showQuestion();

});


// ======================================
// SHOW QUESTION
// ======================================

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    questionText.textContent =
        question.question;


    // Selection hint

    if (question.type === "multiple") {

        selectionHint.textContent =
            `Choose up to ${question.max} options`;

    } else {

        selectionHint.textContent =
            "Choose one answer";

    }


    // Clear previous options

    optionsContainer.innerHTML = "";


    const savedAnswer =
        answers[currentQuestion];


    // Create options

    question.options.forEach((option) => {

        const button =
            document.createElement("button");


        button.classList.add("option");

        button.type = "button";

        button.textContent = option;


        // Restore selected answer

        if (question.type === "single") {

            if (savedAnswer === option) {

                button.classList.add("selected");

            }

        } else {

            if (
                Array.isArray(savedAnswer) &&
                savedAnswer.includes(option)
            ) {

                button.classList.add("selected");

            }

        }


        // Option click

        button.addEventListener(
            "click",
            () => {

                selectOption(
                    button,
                    option,
                    question
                );

            }
        );


        optionsContainer.appendChild(button);

    });


    updateProgress();

    updateNavigation();

}


// ======================================
// SELECT OPTION
// ======================================

function selectOption(
    button,
    option,
    question
) {

    const allOptions =
        document.querySelectorAll(".option");


    // ==================================
    // SINGLE ANSWER
    // ==================================

    if (question.type === "single") {

        allOptions.forEach((item) => {

            item.classList.remove("selected");

        });


        button.classList.add("selected");


        answers[currentQuestion] =
            option;

    }


    // ==================================
    // MULTIPLE ANSWER
    // ==================================

    else {

        let selected =
            answers[currentQuestion] || [];


        if (!Array.isArray(selected)) {

            selected = [];

        }


        // Remove option

        if (selected.includes(option)) {

            selected =
                selected.filter(
                    item => item !== option
                );


            button.classList.remove(
                "selected"
            );

        }


        // Add option

        else {

            if (
                selected.length >=
                question.max
            ) {

                alert(
                    `You can select up to ${question.max} choices.`
                );

                return;

            }


            selected.push(option);


            button.classList.add(
                "selected"
            );

        }


        answers[currentQuestion] =
            selected;

    }


    saveAnswers();

    updateNavigation();

}


// ======================================
// SAVE ANSWERS
// ======================================

function saveAnswers() {

    localStorage.setItem(
        "dateAnswers",
        JSON.stringify(answers)
    );

}


// ======================================
// CONTINUE BUTTON
// ======================================

continueBtn.addEventListener(
    "click",
    () => {

        const answer =
            answers[currentQuestion];


        // Make sure an answer exists

        if (
            !answer ||
            (
                Array.isArray(answer) &&
                answer.length === 0
            )
        ) {

            alert(
                "Please choose an answer first ❤️"
            );

            return;

        }


        // Go to next question

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        }


        // Finish questionnaire

        else {

            finishQuestionnaire();

        }

    }
);


// ======================================
// BACK BUTTON
// ======================================

backBtn.addEventListener(
    "click",
    () => {

        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

        else {

            questionScreen.classList.remove(
                "active"
            );

            homeScreen.classList.add(
                "active"
            );

        }

    }
);


// ======================================
// UPDATE PROGRESS
// ======================================

function updateProgress() {

    const percentage =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    progressBar.style.width =
        `${percentage}%`;

}


// ======================================
// UPDATE NAVIGATION
// ======================================

function updateNavigation() {

    // Back button

    if (currentQuestion === 0) {

        backBtn.textContent =
            "← Home";

    } else {

        backBtn.textContent =
            "← Back";

    }


    // Continue button

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        continueBtn.textContent =
            "Finish ❤️";

    } else {

        continueBtn.textContent =
            "Continue →";

    }

}


// ======================================
// FINISH QUESTIONNAIRE
// ======================================


// ======================================
// FINISH QUESTIONNAIRE
// ======================================

async function finishQuestionnaire() {

    const submission =
        new Date();


    // Save answers to Supabase

    const { error } =
        await supabaseClient
            .from("date_responses")
            .insert({
                answers: answers,
                submitted_at:
                    submission.toISOString()
            });


    // Check if Supabase failed

    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        alert(
            "We couldn't save your answers online. Please try again ❤️"
        );

        return;

    }


    // Create local result

    const result = {

        answers: answers,

        submittedAt:
            submission.toLocaleString(),

        timestamp:
            submission.getTime()

    };


    // Save complete result locally

    localStorage.setItem(
        "dateResult",
        JSON.stringify(result)
    );


    // Change screens

    questionScreen.classList.remove(
        "active"
    );

    finalScreen.classList.add(
        "active"
    );


    // Show answers

    showFinalSummary();


    // Celebration

    createConfetti();

}


// ======================================
// SHOW FINAL SUMMARY
// ======================================

function showFinalSummary() {

    finalSummary.innerHTML = "";


    questions.forEach(
        (question, index) => {

            const answer =
                answers[index];


            const item =
                document.createElement("div");


            item.classList.add(
                "summary-item"
            );


            let answerText;


            if (
                Array.isArray(answer)
            ) {

                answerText =
                    answer.join(", ");

            } else {

                answerText =
                    answer || "No answer";

            }


            const title =
                document.createElement("h3");

            title.textContent =
                question.question;


            const answerElement =
                document.createElement("p");

            answerElement.textContent =
                answerText;


            item.appendChild(title);

            item.appendChild(answerElement);


            finalSummary.appendChild(item);

        }
    );

}


// ======================================
// CONFETTI
// ======================================

function createConfetti() {

    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.classList.add(
            "confetti"
        );


        heart.textContent = "♥";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDelay =
            Math.random() * 2 + "s";


        heart.style.fontSize =
            Math.random() * 20 + 10 + "px";


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 4000);

    }

}


// ======================================
// MUSIC
// ======================================

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");


let musicPlaying = false;


musicBtn.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            music.pause();

            musicBtn.textContent =
                "♫ Music";

            musicPlaying = false;

        }

        else {

            music.play()
                .then(() => {

                    musicBtn.textContent =
                        "♫ Playing";

                    musicPlaying = true;

                })
                .catch(() => {

                    alert(
                        "Please click the music button again."
                    );

                });

        }

    }
);

