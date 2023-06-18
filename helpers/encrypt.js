const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(5)
module.exports={
    createHash:(password)=>{
        return bcrypt.hashSync(password,salt)
    },
    compareHash:(password,hash)=>{
        return bcrypt.compareSync(password,hash)
    }
}