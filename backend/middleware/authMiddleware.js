const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;
    try { 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
     
            // GEt token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } else{
            res.status(401)
            throw new Error('Not authorized')
        }
    } 
    catch(err){
        console.error(`This was the error ${err}`)
        res.status(401)
        next(err)
    }
} 
  


module.exports = {
    protect
}