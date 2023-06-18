const {User} = require('../models')
require('dotenv').config()
const { verifyToken } = require("../helpers/token")
module.exports = async (req,res,next)=>{
 try {
    console.log(req.headers.access_token);
    const {access_token} = req.headers
    const {id} = verifyToken(access_token)
    const user = await User.findByPk(id)
    req.user = {
        id:user.id,
        status:user.status,
    }
    next()
 } catch (error) {
    let code
    let message
    console.log(error,'<<< dari middelware');
    switch (error.name) {
        case 'JsonWebTokenError':
            code = 401
            message = 'Unauthorized'
            break;
    
        default:
            code = 500
            message = 'Internal server error'
            break;
    }
    res.status(code).json({message})
 }
}