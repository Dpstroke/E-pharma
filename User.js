const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contacts: [contactSchema], // Embedding contacts as an array of sub-documents
    tokens: [ // Array to store JWT tokens
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Method to generate JWT token and save it to the user's document
userSchema.methods.generateAuthToken = async function () {
    try {
        // Create the token using the user's _id and a secret key
        let tokennir = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        
        // Store the generated token in the tokens array
        this.tokens = this.tokens.concat({ token: tokennir });
        
        // Save the user document with the new token
        await this.save();
        
        return tokennir; // Return the generated token
    } catch (err) {
        console.log("Error generating auth token:", err);
        throw new Error("Error generating auth token");
    }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
