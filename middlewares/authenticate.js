const {HttpError} = require("../helpers");
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env
const {User}  = require ("../models/user")


const authenticate = async(req, res, next) => {
    
    const {authorization = ""} = req.headers;
    // console.log(authorization)
    const [bearer, token] = authorization.split(" ")
    // console.log(bearer)
    // console.log(token)
    if (bearer !=="Bearer") {
        next(HttpError(401))
   }
try {
    
    const {id} = jwt.verify(token, SECRET_KEY)
    // console.log(id)
    const user = await User.findById(id)
    // console.log(user)
    if (!user|| !user.token || user.token!==token){
        next(HttpError(401))
    }
    req.user = user; 
    next();
} catch  {
    next(HttpError(401))
}
   
module.exports = authenticate

    

    

   


  };
  module.exports = authenticate;