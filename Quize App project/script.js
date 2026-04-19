const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    correct: 2,
  },
  {
    question: "Which language is used for web page interactivity?",
    options: ["C++", "Java", "JavaScript", "PHP"],
    correct: 2,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<p>"],
    correct: 1,
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "text-color", "color", "background"],
    correct: 2,
  },
  {
    question: "Which symbol is used for ID selector in CSS?",
    options: [".", "#", "*", "@"],
    correct: 1,
  },
  {
    question: "Which method is used to select an element in JavaScript?",
    options: [
      "getElementById()",
      "queryStyle()",
      "fetchElement()",
      "selectNode()",
    ],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["img", "image", "src", "pic"],
    correct: 0,
  },
  {
    question: "Which CSS property is used for spacing inside an element?",
    options: ["margin", "padding", "border", "spacing"],
    correct: 1,
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    options: ["int", "string", "let", "define"],
    correct: 2,
  },
];


let qnsNumberEl = document.getElementById("qnsNumber");
let qnsTimer = document.getElementById("qnsTimer");
let qns = document.getElementById("qns");
let options = document.getElementById("options");


let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswer = [];
let timer;
let timeLeft = 30;


function loadQns() {
  let currentQns = quizData[currentIndex];

  qnsNumberEl.innerText = `Qns ${currentIndex + 1}/${quizData.length}`;
  qns.innerText = currentQns.question;

  options.innerHTML = "";
  selectedAnswer = null;

  currentQns.options.forEach((opt, index) => {
    let col = document.createElement("div");
    col.classList.add("col-md-6");

    let button = document.createElement("button");
    button.innerText = opt;

    button.onclick = function () {
      selectedAnswer = index;

      userAnswer[currentIndex] = {
        question: currentQns.question,
        selected: index,
        correct: currentQns.correct,
        options: currentQns.options,
      };

      nextQns();
    };

    col.appendChild(button);
    options.appendChild(col);
  });

  startTimer(); 
}


function startTimer() {
  clearInterval(timer);

  timeLeft = 30;
  qnsTimer.innerText = `Time - ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    qnsTimer.innerText = `Time -  ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);

      if (selectedAnswer === null) {
        userAnswer[currentIndex] = {
          question: quizData[currentIndex].question,
          selected: null,
          correct: quizData[currentIndex].correct,
          options: quizData[currentIndex].options,
        };
      }

      nextQns();
    }
  }, 1000);
}


function nextQns() {
  clearInterval(timer);

  if (
    selectedAnswer !== null &&
    selectedAnswer === quizData[currentIndex].correct
  ) {
    score++;
  }

  if (currentIndex < quizData.length - 1) {
    currentIndex++;
    loadQns();
  } else {
    quizResult();
  }
}


function quizResult() {
  const quizResultEl = document.querySelector(".quiz-card");

  quizResultEl.innerHTML = `
    <h3>Quiz Result 🎉</h3>
    <h4>Score: ${score}/${quizData.length}</h4>

    <h3>Summary</h3>

    <ul>
      ${userAnswer
        .map(
          (ans, index) => `
        <li>
          <b>Q${index + 1}:</b> ${ans.question} <br>
          Your Answer: ${
            ans.selected !== null
              ? ans.options[ans.selected]
              : "Not Answered"
          } <br>
          Correct Answer: ${ans.options[ans.correct]}
        </li>
        <br>
      `
        )
        .join("")}
    </ul>
  `;
}


loadQns();

