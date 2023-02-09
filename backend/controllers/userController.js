const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    //console.log(req.body)
    try {
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
                email: user.email,
                token: generateToken(user._id)
            })
        }
    }
    //Validation
    catch(err) {
        console.error(`This was the error ${err}`)
        next(err)
    }


}

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {

    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    try {
           // check user and passwords match
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Invalid credentails')
        }
        
    } catch(err) {
        console.error(`This was the error ${err}`)
        next(err)
    }
 
}

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = async (req, res, next) => { 
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
}


// Generate token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}