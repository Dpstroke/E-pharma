// payment.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("payment-form");

    form.addEventListener("submit", function (event) {
        // Flag to check if form is valid
        let isValid = true;

        // Get form values
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const cardName = document.getElementById("card-name").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Regular expressions for validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cardNumberPattern = /^\d{16}$/; // 16 digits for card number
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
        const cvvPattern = /^\d{3,4}$/; // 3 or 4 digits for CVV

        // Form validation
        if (fullName === "") {
            alert("Full Name is required.");
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        if (cardName === "") {
            alert("Name on Card is required.");
            isValid = false;
        }

        if (!cardNumberPattern.test(cardNumber)) {
            alert("Please enter a valid 16-digit credit card number.");
            isValid = false;
        }

        if (!expiryDatePattern.test(expiryDate)) {
            alert("Please enter a valid expiry date in MM/YY format.");
            isValid = false;
        }

        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid CVV (3 or 4 digits).");
            isValid = false;
        }

        // Prevent form submission if any validation failed
        if (!isValid) {
            event.preventDefault(); // Stops form submission if invalid
            console.log('Form submission prevented due to validation error.');
        }
    });
});
