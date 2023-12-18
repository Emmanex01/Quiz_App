const quizQuestion = [
    {
        question: "Which of the following is a programming langauage?",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: false},
            {text: "JAVASCRIPT", correct: true},
            {text: "PSB", correct: false}
        ]
    },
    {
        question: "Which of the following is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "Which is a javascript library?",
        answers: [
            {text: "C programming", correct: false},
            {text: "Nextjs", correct: false},
            {text: "Reactjs", correct: true},
            {text: "Nodejs", correct: false}
        ]
    }

];

const question = document.querySelector(".question");
const answerButtons = document.querySelector(".answerButtons");
const nextBtn = document.querySelector(".next");

let currentQuesIndex = 0;
let currentScore = 0;

function startQuiz() {
    currentQuesIndex = 0;
    currentScore = 0;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = quizQuestion[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    
    currentQuestion.answers.forEach(element => {
        let button = document.createElement("button");
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.innerHTML = element.text;
        if(element.correct){
            button.dataset.correct = element.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState() {
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
};

function selectAnswer(e){
    let selectedBtn = e.target;
    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add("correct")
        currentScore++;
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        } 
        button.disabled = true;
        nextBtn.style.display = "block";
    })
};

nextBtn.addEventListener("click", () => {
    if(currentQuesIndex < quizQuestion.length) {
        handleNextBtn();
    } else{
        startQuiz();
    }
});

function handleNextBtn(){
    currentQuesIndex++;
    if(currentQuesIndex < quizQuestion.length){
        showQuestion()
        // alert("Hello")
    }else {
        
        showScore();
    }
};

function showScore(){
    resetState();
    question.innerHTML = `You scored ${currentScore} out of ${quizQuestion.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
};

startQuiz();