var jwt=require('jsonwebtoken')
var {UnauthenticatedError}=require('../errors')

var authenticationMiddleware =async (req,res,next)=>{
    console.log(req.headers.authorization);
    var authHeader=req.headers.authorization
    // if(!authHeader || !authHeader.startsWith('Bearer ')){
    //     throw new UnauthenticatedError('No token provided')
    // }
    // var token = authHeader.split(' ')[1]
    console.log(authHeader)
    console.log("Authenticator Middle ware passed")
    try {
        var decoded=jwt.verify(token,process.env.JWT_SECRET)
        var {id,email}=decoded
        req.user={id,email}
        console.log("passed authenticator")
        console.log(req.user)
        next()
    } catch (err) {
        throw new UnauthenticatedError('Not Authorized to access this route')
    }
    
}

module.exports=authenticationMiddleware