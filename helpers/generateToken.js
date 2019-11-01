let jwt = require('jsonwebtoken');

module.exports = (user) => {
    let encoded =  jwt.sign({email : user.email}, process.env.JWT_SECRET)    
    return encoded
}