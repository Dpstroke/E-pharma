const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User'); // Adjust the path if necessary
const router = express.Router();

router.use(express.json());

// Registration route
router.post('/register', async (req, res) => {
    console.log(req.body); // Log incoming request body

    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log("User saved:", newUser);

        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log('Incoming login data:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = await user.generateAuthToken();

        // Respond with the token
        res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Contact route
router.post('/contact', async (req, res) => {
    try {
        const {  name, email, phone, message } = req.body;
        
        // Validate that all required fields are provided
        if ( !name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add contact data to the user's contacts array
        user.contacts.push({ name, email, phone, message });

        // Save the updated user document
        await user.save();

        res.status(201).json({ message: "Contact data saved successfully" });
    } catch (error) {
        console.error("Error processing contact data:", error);
        res.status(500).json({ error: "Error saving contact data", details: error.message });
    }
});

// Payment processing route
router.post('/processpayment', async (req, res) => {
    console.log('Incoming payment data:', req.body);

    const {
        fullName, email, address, city, state, zip, country,
        cardName, cardNumber, expiryDate, product, quantity, total
    } = req.body;

    if (!fullName || !email || !address || !city || !state || !zip || !country || !cardName || !cardNumber || !expiryDate || !total) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const maskedCardNumber = '**** **** **** ' + cardNumber.slice(-4);
        const paymentDetails = {
            fullName,
            email,
            address,
            city,
            state,
            zip,
            country,
            cardName,
            cardNumber: maskedCardNumber,
            expiryDate,
            product: product || 'Unknown Product',
            quantity: quantity || 1,
            total: parseFloat(total)
        };

        user.payments.push(paymentDetails);
        await user.save();
        console.log('Payment saved for user:', user.email, 'with payment details:', paymentDetails);

        res.status(200).json({ message: 'Payment processed successfully!' });
    } catch (err) {
        console.error('Error processing payment:', err);
        res.status(500).json({ message: 'Server error during payment processing' });
    }
});

module.exports = router;
