const mongoose = require("mongoose");

// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });
// // Create User model
// const User = mongoose.model("User", userSchema); // This line causes OverwriteModelError
// // Rest of the code...
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});