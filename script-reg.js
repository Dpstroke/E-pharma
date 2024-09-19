document.getElementById("registrationForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        event.preventDefault(); // Prevent form submission
    }
});
