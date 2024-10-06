const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Adjust the path if necessary

// Authentication middleware
const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization').replace('Bearer ', ''); 
        
        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        
        // Find user with valid token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); 

        if (!user) {
            throw new Error(); // If user not found, throw an error
        }

        req.user = user; // Attach user info to the request object
        req.token = token; // Attach token to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        res.status(401).json({ message: 'Please authenticate' }); // Handle errors
    }
};

module.exports = auth;
