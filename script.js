function login() {
    const email = document.getElementById('login-email').value;
    const password= document.getElementById('login-password').value;
     
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (email === 'admin@quiz.com' && password === 'admin123') {
    alert('Welcome Admin!');}
    else if (users.some(user => user.email === email && user.password === password)) {
        alert(`Welcome, ${email}`);
        localStorage.setItem('currentUser', email);}
        else {
            alert('Invalid email or password!');}
}
