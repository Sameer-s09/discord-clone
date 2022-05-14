const jwt = require('jsonwebtoken');

const config = process.env;

const verfiyToken = (req,res,next) =>{
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token){
        return res.status(403).send({message:"A token is required for authentication"});        
        //logout user session
    }
    try{
        token = token.replace(/^Bearer\s+/,"");
        const decoded = jwt.verify(token,config.TOKEN_KEY);
        req.user = decoded;
    }catch(err){
        return res.status(401).send({message:"Invalid token"});
    }
    return next();
};

module.exports = verfiyToken;