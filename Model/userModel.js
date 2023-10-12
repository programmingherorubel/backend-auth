const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});


// Define a static method for user validation
userSchema.statics.validateUser = async function (email, password) {
    // Check if name, email, and password are provided
    if (!email || !password) {
        throw new Error('All fields must be provided');
    }

    // Check if the provided email is valid
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    // Check if a user with the same email already exists
    const existingUser = await this.findOne({ email });

    if (existingUser) {
        throw new Error('This email is already in use');
    }

    // Create a new user with the hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });

    return user;
};


// Define a static method for user Login validation
userSchema.statics.validateLoginUser = async function (email, password) {
    // Check if name, email, and password are provided
    if (!email || !password) {
        throw new Error('All fields must be provided');
    }


    // Check if the provided email is valid
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    // Check if a user with the same email already exists
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('Email not Found');
    }

    // check user 
    const passwordMatch = await bcrypt.compare(password, user.password);

    // check password matching 
    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }


    return user;
};


module.exports = mongoose.model('User', userSchema)