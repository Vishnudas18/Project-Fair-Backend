const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt middleware");
    //token verification
    //get the token from req header
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    //verify token
    try{
        const tokenVerification =jwt.verify(token,"superkey2024")
        console.log(tokenVerification);
        req.payload = tokenVerification.userId
        next()
    }
    catch{
        res.status(401).json("Authorization faild Please Login Again")
    }

}
module.exports = jwtMiddleware