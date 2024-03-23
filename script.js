const quizData = [
  {
    question: 'What is the synonym of Fostering?',
    options: ['Safegaurding', 'Neglecting', 'Ignoring', 'Nuturing'],
    answer: 'Nuturing',
  },
  {
    question: 'What is the antonym of hinderance?',
    options: ['cooperation', 'aid', 'agreement', 'persuasion'],
    answer: 'aid',
  },
  {
    question: 'Which word is correctly spelt?',
    options: ['Embarassement', 'Embarasement', 'Embarrassment', 'Emmbarasment'],
    answer: 'Embarrassment',
  },
  {
    question: 'What is the place where monks live as a secluded community?',
    options: ['Cathedral', 'Diocese', 'Monestry', 'Convent'],
    answer: 'Monestry',
  },
  {
    question: 'Fill the blank with correct option: He always comes ______ home late.',
    options: [
      'to',
      'at',
      'both of the above',
      'none of the above',
    ],
    answer: 'none of the above',
  },
  {
    question: 'Choose the correct preposition: The doctor gave me a prescription ____ my cough. ',
    options: ['at', 'of', 'for', 'with'],
    answer: 'for',
  },
  {
    question: 'What is the correct meaning of the phrase:"To hold your peace"? ',
    options: [
      'Remain peaceful',
      'Keep silent',
      'Remain seated',
      'Become reconciled',
    ],
    answer: 'Keep silent',
  },
  {
    question: 'Choose the correct article: For me, breakfast is _____ best meal of the day.',
    options: ['a', 'an', 'the', 'no article'],
    answer: 'the',
  },
  {
    question: 'Change the voice: Alexender expected to conquer the world. ',
    options: [
      'It was expected by Alexander that he should conquer the world.',
      'It was expected by Alexander that he would conquer the world.',
      'It was expected by Alexander that he will conquer the world.',
      'It had been expected by Alexander that he would conquer the world.',
    ],
    answer: 'It was expected by Alexander that he would conquer the world.',
  },
  {
    question: 'Change the narration: He said,"I have passed the examination." ',
    options: ['He said that he had passed the examination.', 'He announced that he has passed the examination.', 
	'He said that he had to pass the examination', 'He said that he has passed the examination.'],
    answer: 'He said that he had passed the examination.',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}


function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
 

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
	 `;
  }

  
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
	<button type="button" style="height:25px;width:45px;"><a href="thankyou.html">Exit</a></button>
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
