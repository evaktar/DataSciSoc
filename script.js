const questions = [
    {
        question: "What is Data Science?",
        answers: [
            { text: "The use and development of computer systems that are able to learn and adapt without following explicit instructions via algorithms and statistical models to analyse and draw inferences from patterns in data.", correct: false },
            { text: "The study of data to extract meaningful insights.", correct: true },
            { text: "The study of human excrement.", correct: false },
            { text: "The process of using statistical analysis and machine learning to discover hidden patterns, correlations, and anomalies within large datasets", correct: false },
        ]
    },
    {
        question: "What does the term 'overfitting refer to in machine learning?",
        answers: [
            { text: "Model performs poorly on both training and test data.", correct: false },
            { text: "Model performs well on training data but poorly on new data.", correct: true },
            { text: "Model performs well on test data but poorly on training data.", correct: false },
            { text: "Model has too few parameters", correct: false },
        ]
    },
    
];

const question = document.getElementById("question");
const answer = document.getElementById("answers");
// const arrow = document.getElementById("arrow");

let currIdx = 0;
let score = 0;

function startQuiz(){
    currIdx = 0;
    score = 0;
    // arrow.innerHTML = "&#8680;";
    dispQuestion();
}

function dispQuestion(){
    let current = questions[currIdx];
    question.innerHTML = (currIdx + 1) + ") " + current.question;

    answer.innerHTML = "";  // clear prev button

    current.answers.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("answer");
        button.addEventListener("click", () => dispAnswer(ans, button));
        answer.appendChild(button);
    });
}

function dispAnswer(ans, clickedButton) {
    // Disable all buttons
    const allButtons = answers.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    // Correct only if correct, correct and current incorrect if incorrect
    allButtons.forEach(btn => {
        if (btn.innerHTML === ans.text && ans.correct) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        } else if (btn.innerHTML === clickedButton.innerHTML && !ans.correct) {
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
        }
        
        // Actual  Answer
        const current = questions[currIdx];
        const correctAns = current.answers.find(a => a.correct);
        if (btn.innerHTML === correctAns.text) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        }
    });

    if (ans.correct) {
        score++; // Update score
    }

    // Change to next question after 1 second of answer clicked
    setTimeout(() => {
        currIdx++;
        if (currIdx < questions.length) {
            dispQuestion();
        } else {
            question.innerHTML = `You Scored: ${score}/${questions.length}`;
            answer.innerHTML = "";
        }
    }, 500);
}

// Change to next question when arrow clicked
// arrow.addEventListener("click", () => {
//     currIdx++;
//     if (currIdx < questions.length) {
//         dispQuestion();
//     } else {
//         question.innerHTML = `You completed the quiz. Your score: ${score}/${questions.length}`;
//         answers.innerHTML = "";
//         arrow.style.display = "none"; // Hide arrow at the end
//     }
// });

startQuiz(); 
