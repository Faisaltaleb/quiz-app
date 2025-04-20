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
