// // Function to validate email
// function validateEmail() {
//     const emailInput = document.getElementById("email");
//     const emailValue = emailInput.value;
//     const errorMessage = document.getElementById("email-error");
    
//     // Email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (emailRegex.test(emailValue)) {
//         errorMessage.textContent = ""; // Clear error message if valid
//         return true;
//     } else {
//         errorMessage.textContent = "Please enter a valid email address.";
//         return false;
//     }
// }

// // Attach validation to form submission
// document.querySelector("form").addEventListener("submit", function (e) {
//     if (!validateEmail()) {
//         e.preventDefault(); // Prevent form submission if invalid
//     }
// });


const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const formContainer = document.getElementById('form-container');
const formTitle = document.getElementById('form-title');

document.getElementById('signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    formTitle.textContent = 'Sign up';
    formTitle.classList.add('signup'); 
});

document.getElementById('login-link').addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Log In';
    formTitle.classList.remove('signup');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required.';
    }

    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
    }

    if (email && password) {
        alert('Login successful!');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    document.getElementById('signup-email-error').textContent = '';
    document.getElementById('signup-password-error').textContent = '';
    document.getElementById('confirm-password-error').textContent = '';

    if (!email) {
        document.getElementById('signup-email-error').textContent = 'Email is required.';
    }

    if (!password) {
        document.getElementById('signup-password-error').textContent = 'Password is required.';
    }

    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
    }

    if (email && password && password === confirmPassword) {
        alert('Signup successful!');
    }
});

