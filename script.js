function login() {
    const email = document.getElementById('login-email').value;
    const password= document.getElementById('login-password').value;
     
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (email === 'admin@quiz.com' && password === 'admin123') {
    alert('Welcome Admin!');}
    else if (users.some(user => user.email === email && user.password === password)) {
        alert(`Welcome, ${email}`);
        localStorage.setItem('currentUser', email);
        location.href = 'home.html';}
        else {
            alert('Invalid email or password!');}
}



function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('Email is already registered!');
        return;
      }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    location.href = 'index.html';  
    }
    

const mockQuizzes = [
    {
      id: 1,
      title: "General Knowledge Quiz",
      description: "Test your knowledge on a variety of topics!",
      questions: [
        { 
          text: "What is the capital of France?", 
          options: ["Berlin", "Madrid", "Paris", "Rome"], 
          answer: 2 
        },
        { 
          text: "Which planet is known as the Red Planet?", 
          options: ["Earth", "Mars", "Jupiter", "Venus"], 
          answer: 1 
        },
        { 
          text: "What is the largest ocean on Earth?", 
          options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], 
          answer: 2 
        }
      ]
    },
    {
      id: 2,
      title: "Science Quiz",
      description: "Dive into the world of science and discovery.",
      questions: [
        { 
          text: "What is the chemical symbol for water?", 
          options: ["O2", "H2O", "CO2", "HO"], 
          answer: 1 
        },
        { 
          text: "What gas do plants absorb during photosynthesis?", 
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
          answer: 2 
        },
        { 
          text: "What is the speed of light?", 
          options: ["299,792 km/s", "150,000 km/s", "1,080,000 km/h", "670,616 km/h"], 
          answer: 0 
        }
      ]
    },
    {
      id: 3,
      title: "History Quiz",
      description: "Explore the events that shaped our world.",
      questions: [
        { 
          text: "Who was the first President of the United States?", 
          options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], 
          answer: 2 
        },
        { 
          text: "In which year did World War II end?", 
          options: ["1940", "1945", "1939", "1942"], 
          answer: 1 
        },
        { 
          text: "Who discovered America?", 
          options: ["Christopher Columbus", "Leif Erikson", "Amerigo Vespucci", "Ferdinand Magellan"], 
          answer: 2
        }
      ]
    }
  ];
  
  localStorage.setItem('quizzes', JSON.stringify(mockQuizzes));

  

  if (!localStorage.getItem('quizzes')) {
    localStorage.setItem('quizzes', JSON.stringify(mockQuizzes));
  }
  
  function loadHomePage() {
   
    const currentUser = localStorage.getItem('currentUser');
    document.getElementById('welcome-message').innerText = `Hello, ${currentUser}`;
  
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizList = document.getElementById('quiz-list');
  

    quizList.innerHTML = quizzes.map(quiz => `
      <div class="quiz-item" onclick="startQuiz(${quiz.id})">
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
      </div>
    `).join('');
  }
  

  function startQuiz(quizId) {
     alert(`Starting Quiz ID: ${quizId}`);
     localStorage.setItem('currentQuizId', quizId); 
     location.href = 'quiz.html'; //
      }
      
  
  
  function logout() {
    localStorage.removeItem('currentUser'); 
    location.href = 'index.html'; 
  }
  
  
  if (document.getElementById('home-page')) {
    loadHomePage();
  }

  function loadQuizPage() {
    const quizId = localStorage.getItem('currentQuizId');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
  
    if (quiz) {
      document.getElementById('quiz-title').innerText = quiz.title;
      document.getElementById('quiz-description').innerText = quiz.description;

      const quizForm = document.getElementById('quiz-form');
      quizForm.innerHTML = quiz.questions.map((question, index) => `
        <div>
          <p><strong>${index + 1}. ${question.text}</strong></p>
          ${question.options.map((option, optionIndex) => `
            <label>
              <input type="radio" name="question${index}" value="${optionIndex}"> ${option}
            </label>
          `).join('')}
        </div>
      `).join('');
    } else {
      alert("Quiz not found!");
    }
  }
  function submitQuiz() {
    const quizId = localStorage.getItem('currentQuizId');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
  
    let score = 0;
  
    quiz.questions.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption && parseInt(selectedOption.value) === question.answer) {
        score++;
      }
    });
  
    alert(`Your score is ${score} out of ${quiz.questions.length}`);
  
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === currentUser);
  
    if (user) {
      user.scores = user.scores || [];
      user.scores.push({ quiz: quiz.title, score });
      localStorage.setItem('users', JSON.stringify(users));
    }

    location.href = 'home.html';
  }
  if (document.getElementById('quiz-page')) {
    loadQuizPage();
  }

function loadDashboard(){
  const users = JSON.parse(localStorage.getItem('user')) || []
  const tableBody = document.querySelector('#users-table tbbody');

  tableBody.innerHTML = users.map(user => `
    <tr>
      <td>${user.email}</td>
      <td>${user.scores ? user.scores.map(score => `${score.quiz}: ${score.score}`).join(', ') : 'No scores yet'}</td>
    </tr>
  `).join('');

}

function logout() {
  localStorage.removeItem('currentUser');
  location.href= 'index.html';
}
