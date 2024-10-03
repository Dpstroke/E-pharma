document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirm_password = document.getElementById('confirm_password').value.trim();

    // Basic validation
    if (!username || !email || !password || !confirm_password) {
        alert("All fields are required!");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Send a POST request to the registration endpoint
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirm_password
            })
        });

        // Check if the response is OK (2xx status)
        if (!response.ok) {
            const errorResult = await response.json();  // Assuming the server sends back JSON error messages
            alert(errorResult.message || "Registration failed.");
            return;
        }

        const result = await response.json(); // Parse the result
        if (result.status === 201 || response.status === 201) {
            alert("Registration successful! Please log in.");
            window.location.href = 'Login Page.html';  // Redirect to login page
        } else {
            alert(result.message || "Registration failed.");
        }

    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred during registration. Please try again.");
    }
});
