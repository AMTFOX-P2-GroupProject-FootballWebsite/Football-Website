module.exports = function(err,req,res,next){
    // console.log(err.name)
    let statusCode = 500
    let errors = []
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            err.errors.forEach(errData =>{
                errors.push(errData.message)
            })
            break;
        case 'JsonWebTokenError':
            statusCode = 401;
            errors.push('Token invalid')
            break;
        default:
            let message = err.msg || 'internal server error'
            errors.push(message);
            statusCode = err.status || statusCode
            break;
        }
    res.status(statusCode).json({errors})
}
