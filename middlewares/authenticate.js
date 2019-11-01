const verifyJwt = require('../helpers/verifyJwt') // ini dugunaka buat men-decoded token
const User = require('../models').User
//let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = verifyJwt(req.headers.token) // token yang ada akan kita decoded
        req.user = decoded // udah dapet object User yang isinya {id : 'nilai  id'} ==> selalu simpan di req.user 
        User.
            findOne({
                where : {
                    id : req.user.id
                }
            })
            .then(user => {
                if (user) { // periksa kalo user sudah ada 
                    next()  // kalo ada, middlewere akan lenjut ke middleware selanjutnya atau ke controller
                } else {
                    res.status(404).json( {
                        msg : `user not found`
                    })
                    // next({
                    //     status : 404,
                    //     msg : 'user not found'
                    // })
                }
            })       
        
    } catch (err) {
        next(err)        
        // res.status(500).json( {
        //     msg : `error`
        // })
    }
}