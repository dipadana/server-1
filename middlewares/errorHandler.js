module.exports = (err, req, res, next) => {
    console.log(err)
    switch (err.name) {
        case 'ValidationError':
            let messages = []
            if (Array.isArray(err.errors)) {
                for (let value of err.errors) {
                    messages.push(value.message)
                }
            } else {
                messages = err.message
            }
            return res.status(400).send({
                msg: messages
            })      
        case 'DataError':            
            return res.status(404).send({
                msg: 'user not found'
            })   
        case 'CastError':
            return res.status(400).send({
                msg: `id invalid`
            })
        case 'MongoError':
            return res.status(400).send({
                msg: `email already registered`
            })   
        case 'WrongPassword' : {
            return res.status(400).send({
                msg : 'wrong password'
            })
        }    
        default:            
            return res.status(500).send({
                msg: 'Internal Server Error'
            })
    }

}


