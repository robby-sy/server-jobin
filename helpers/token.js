const jwt = require('jsonwebtoken')
require('dotenv').config()
const key = process.env.jwtKey
module.exports = {
    signToken:(payload)=>{
        console.log(key);
        return jwt.sign(payload,key)
    },
    verifyToken:(token)=>{
        return jwt.verify(token,key)
    }
}

