const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')

const userToken = (_id)=>{
    return   jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:'3d'})
}

const loginUserPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.validateLoginUser(email, password);
        const token = userToken(user._id)

        res.status(200).json({ success: true, message: 'Login successful', user,token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'Login failed', error: error.message });
    }
};

const registerUserPost = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.validateUser(email, password);
        res.status(201).json({ success: true, message: 'Registration successful', user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'Registration failed', error: error.message });
    }
};





module.exports = { loginUserPost, registerUserPost }