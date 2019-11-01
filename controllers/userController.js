`use strict`
const User = require('../models/user')
const comparePassword = require('../helpers/comparePassword')
const generateToken = require('../helpers/generateToken')

class userController{
    
    static register(req, res, next) {
        User.create({
            email : req.body.email,
            password : req.body.password
        })
        .then( user => {
            res.json({
                msg : `${user.email} is succesfully registered`
            })
        })
        .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email : req.body.email
        })
        .then(user => {            
            if (user) {
                let valid = comparePassword(req.body.password, user.password) // input dicompare server
                if ( valid ) {                    
                    let token = generateToken(user)  
                    res.status(201).json({
                        token                      
                    })
                } else {
                    next({
                        name : 'WrongPassword'
                    })
                }
            } else {
                next({
                    name : 'DataError'
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res, next) {        
        let { email } = req.decoded
        User.findOne({
            email : email
        })
        .then( model => {
            let password = email+'tes'
            if (!model) {
                return User.create({email, password})
            } else {
                let token = generateToken(email)  
                res.json({
                    status : 200,
                    token : token
                })  
            }
        })
        .then(member => {
            let token = generateToken(email)  
            res.json({
                status : 200,
                token : token
            })                     
        })
        .catch(next) 
                   
    }
}

module.exports = userController