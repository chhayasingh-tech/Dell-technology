
document.addEventListener("DOMContentLoaded", function () {
    // Elements for both sections
    const signInSection = document.getElementById('signInSection');
    const createAccountSection = document.getElementById('createAccountSection');
  
    // Show sign in form
    document.getElementById('signInBtn').addEventListener('click', () => {
        signInSection.style.display = 'block';
        createAccountSection.style.display = 'none';
    });
  
    // Show create account form
    document.getElementById('createAccountBtn').addEventListener('click', () => {
        createAccountSection.style.display = 'block';
        signInSection.style.display = 'none';
    });
  
    // Handle Sign In form submission
    document.getElementById('signInForm').addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
  
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
  
        try {
            const response = await fetch("http://localhost:3000/users");
            const users = await response.json();
  
            const user = users.find(user => user.email === email && user.password === password);
  
            if (user) {
                alert(`Welcome back, ${user.firstName}!`);
                window.location.href = "profile.html";  // Redirect to profile page
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please check your connection or server.");
        }
    });
  
    // Handle Create Account form submission
    document.getElementById('createAccountForm').addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('createEmail').value;
        const password = document.getElementById('createPassword').value;
  
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
  
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };
  
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
  
            if (response.ok) {
                alert('Account created successfully!');
                window.location.href = "signin.html"; // Redirect to sign in page
            } else {
                alert('Failed to create account.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please check your connection or server.');
        }
    });
  });