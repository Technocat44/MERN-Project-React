const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    //Validation
    if(!name || !email || !password) {
       res.status(400)
       throw new Error('Please include all fields')
    }
    // Find if user already exist
    const userExists = await User.findOne({email: email})
    
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user 
    const user = await User.create({
        name: name,
        email, email,
        password: hashedPassword
    })

    // If user is created then we send a status of 201 created
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
}

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    res.send('Login Route')
}

module.exports = {
    registerUser,
    loginUser
}