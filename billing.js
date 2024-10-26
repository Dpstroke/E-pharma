document.addEventListener('DOMContentLoaded', function () {
    // Function to get URL parameters
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the product name from the URL
    const productName = getURLParameter('name');
    console.log('Product Name from URL:', productName); // Log product name for verification

    // Display the product name in the order summary
    if (productName) {
        const productElement = document.querySelector('.product-name');
        if (productElement) {
            productElement.innerHTML = `Product: ${productName}`;
        } else {
            console.warn("Product name element not found in the DOM.");
        }
    }

    // Add event listener to the payment form
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Collect the form data
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const state = document.getElementById('state').value.trim();
            const zip = document.getElementById('zip').value.trim();
            const country = document.getElementById('country').value.trim();

            // Payment details
            const cardName = document.getElementById('card-name').value.trim();
            const cardNumber = document.getElementById('card-number').value.trim();
            const expiryDate = document.getElementById('expiry-date').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            // Basic validation to check if all fields are filled
            if (!fullName || !email || !address || !city || !state || !zip || !country || !cardName || !cardNumber || !expiryDate || !cvv) {
                alert("Please fill out all the required fields.");
                return;
            }

            try {
                // Send the payment data to the backend via POST request
                const response = await fetch('http://localhost:3000/processpayment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        address,
                        city,
                        state,
                        zip,
                        country,
                        cardName,
                        cardNumber,
                        expiryDate,
                        cvv,
                        // Include order details
                        product: productName || 'Unknown Product', // Use the product name from the URL
                        quantity: 1,
                        total: 49.99 // Adjust this based on the product price if needed
                    }),
                });

                // Check if the response is OK (status 200)
                if (response.ok){
                    const result = await response.json();
                    alert("Payment processed successfully!");
                    window.location.href = "end.html"; // Redirect to success page
                } else {
                    const result = await response.json();
                    alert(result.error || "Payment processing failed.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during payment processing. Please try again.");
            }
        });
    } else {
        console.warn("Payment form not found in the DOM.");
    }
});