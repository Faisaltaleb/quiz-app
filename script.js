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


    const quizzes = [
        { title: "General Knowledge Quiz", id: 1 },
        { title: "Science Quiz", id: 2 },
        { title: "History Quiz", id: 3 }
      ];
      function loadHomePage() {
        const currentUser = localStorage.getItem('currentUser');
        document.getElementById('welcome-message').innerText = `Hello, ${currentUser}`;
      
        const quizList = document.getElementById('quiz-list');
        quizList.innerHTML = quizzes.map(quiz => `
          <div class="quiz-item" onclick="startQuiz(${quiz.id})">
            <h3>${quiz.title}</h3>
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