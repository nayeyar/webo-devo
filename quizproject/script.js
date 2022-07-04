const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
let shuffleQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setnextQuestion();
});

function startGame(){
    startButton.classList.add("hide");
    shuffleQuestions=questions.sort(() => Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setnextQuestion();
    quizScore = 0;
}

function setnextQuestion(){
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct);
    });
    if(shuffleQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove("hide");
    }
    else{
        startButton.innerText="Restart";
        startButton.classList.remove("hide");
    }
    if(selectedButton.dataset = correct){
        quizScore++;
    }
    document.getElementById("right-answers").innerHTML=quizScore;
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {
        question: "which one of these is a JavaScript framework?",
        answers: [
            { text: "Python", correct: false},
            { text: "Django", correct: false},
            { text: "React", correct: true},
            { text: "Eclipse", correct: false}
        ]
    },
    {
        question: "who is the president of the United States?",
        answers: [
            { text: "Barrack Obama", correct: false},
            { text: "Joe Biden", correct: true},
            { text: "Donald Trump", correct: false},
            { text: "Vladimir Putin", correct: false}
        ]
    },
    {
        question: "who is the CEO of Google?",
        answers: [
            { text: "Steve Jobs", correct: false},
            { text: "Elon Musk", correct: false},
            { text: "Sundar Pichai", correct: true},
            { text: "Jeff Bezos", correct: false}
        ]
    }
]