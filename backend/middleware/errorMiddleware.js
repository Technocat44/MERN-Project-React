const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 // this will be from the res.status() we send 
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something is wrong';

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack

    })
}

module.exports = {errorHandler}