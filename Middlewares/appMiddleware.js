const appMiddleware = (req,res,next)=>{
    console.log("Inside the app middleware");
    next()

}
module.exports = appMiddleware