document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    try {
        // Send data to the backend
        const response = await fetch('http://localhost:3000/contact', { // Adjust the URL to your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Send token in the request header
            },
            body: JSON.stringify(formData)
        });

        // Handle the response from the backend
        const data = await response.json();

        if (response.ok) {
            console.log('Message sent successfully:', data);
            alert('Your message has been sent!');
            // Optionally, clear the form
            document.getElementById('contact-form').reset();
        } else {
            console.error('Error sending message:', data.message);
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
    }
});
