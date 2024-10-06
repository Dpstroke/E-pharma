document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Send the login data to the server via POST request
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        // Check if the response status is OK (200)
        if (response.ok) {
            const result = await response.json();
            alert("Login successful!");
            localStorage.setItem('token', result.token); // Store token in local storage
            window.location.href = "homepage.html"; // Redirect to homepage
        } else {
            const result = await response.json();
            alert(result.message || "Login failed.");
        }
    } catch (error) {
        console.log('Error:', error);
        alert("An error occurred during login. Please try again.");
    }
});