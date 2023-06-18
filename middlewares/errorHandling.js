module.exports = (error,req,res,next) => {
    let code
    let message
    console.log(error);
    switch (error.name) {
        case 'SequelizeUniqueConstraintError':
            code = 400
            message = 'this email already registered, try use another email or login'
        break;
        case 'EmptyField':
            code = 400
            message = 'Email or Password is Required for Login'
        break;
        case 'unauthorized':
            code = 401
            message = 'Email or Password is Incorrect'
        break;
    
        default:
            code = 500
            message = 'internal server error'
            break;
    }
    res.status(code).json({message})
}