function changeColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.querySelector('header').style.backgroundColor = randomColor;
}
document.getElementById('changeColor').addEventListener('click', changeColor);

const toggleButton = document.getElementById('toggleInterests');
const interestsSection = document.getElementById('interestsSection');
function toggleVisibility() {
    if (interestsSection.style.display === 'none') {
        interestsSection.style.display = 'block';
    } else {
        interestsSection.style.display = 'none';
    }
}
toggleButton.addEventListener('click', toggleVisibility);

function calculateDaysUntilBirthday() {
    const today = new Date();
    const birthDate = new Date(today.getFullYear(), 10, 14);

    if (today > birthDate) {
        birthDate.setFullYear(today.getFullYear() + 1);
    }
    const diffInMilliseconds = birthDate - today;
    const daysRemaining = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return daysRemaining;
}
function updateCountdown() {
    const countdownElement = document.getElementById('countdownTimer');
    const daysLeft = calculateDaysUntilBirthday();
    countdownElement.textContent = `There are ${daysLeft} days left until the next birthday!`;
}
updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

const quizQuestions = [
    {
        question: "What is Mykyta Danets' age?",
        answers: ["18", "20", "25", "30"],
        correctAnswer: "18"
    },
    {
        question: "Which university is Mykyta Danets a student of?",
        answers: ["WAB", "Harvard", "Oxford", "MIT"],
        correctAnswer: "WAB"
    },
    {
        question: "What are Mykyta's interests?",
        answers: ["Reading, Gaming", "Painting, Music", "Traveling, Sports", "Cooking, Photography"],
        correctAnswer: "Reading, Gaming"
    },
    {
        question: "Where is Mykyta Danets located?",
        answers: ["Wroclaw, PL", "Kyiv, UA", "Warsaw, PL", "Lviv, UA"],
        correctAnswer: "Wroclaw, PL"
    },
    {
        question: "What is Mykyta's school achievement?",
        answers: ["10/12 average", "12/12 average", "8/12 average", "9/12 average"],
        correctAnswer: "10/12 average"
    }
];
let currentQuestionIndex = 0;
let score = 0;
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answer_container');
    const feedback = document.getElementById('feedback');
    questionContainer.textContent = question.question;
    answerContainer.innerHTML = '';
    question.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.addEventListener('click', () => checkAnswer(answer));
        answerContainer.appendChild(answerButton);
    });
    feedback.textContent = ''; 
}
function checkAnswer(selectedAnswer) {
    const question = quizQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    if (selectedAnswer === question.correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Wrong! The correct answer is: ${question.correctAnswer}.`;
    }
    const answerButtons = document.querySelectorAll('#answer_container button');
    answerButtons.forEach(button => button.disabled = true);
}
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}
function showResults() {
    const quizContainer = document.getElementById('quiz_container');
    const feedback = document.getElementById('feedback');
    quizContainer.innerHTML = `<h2>Your Score: ${score} / ${quizQuestions.length}</h2>`;
    feedback.textContent = `You have completed the quiz! Well done!`;
}
document.getElementById('next_button').addEventListener('click', nextQuestion);
displayQuestion();
