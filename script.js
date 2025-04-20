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
    
localStorage.setItem('quizzes', JSON.stringify([
        { id: 1, title: "General Knowledge Quiz", description: "Test your knowledge on a variety of topics!" },
        { id: 2, title: "Science Quiz", description: "Dive into the world of science and discovery." },
        { id: 3, title: "History Quiz", description: "Challenge your knowledge of historical events!" }
 ]));
  

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
   
  }
  
  
  function logout() {
    localStorage.removeItem('currentUser'); 
    location.href = 'index.html'; 
  }
  
  
  if (document.getElementById('home-page')) {
    loadHomePage();
  }