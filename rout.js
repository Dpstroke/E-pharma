const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');  // Adjust the path if necessary

router.use(express.json());
// Registration route

router.post('/register', async (req, res) => {
    console.log(req.body); // Log incoming request body

    const { username, email, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 rounds of salt

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword // Use the hashed password here
        });

        await newUser.save(); // Save user to the database
        console.log("User saved:", newUser); // Log saved user data

        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error('Error saving user:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password }); // Log login attempt

    try {
        // Find the user by username or email
        const user = await User.findOne({ username });
        console.log('User found:', user); // Log found user or null
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log password comparison result
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login, respond with a success message
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;