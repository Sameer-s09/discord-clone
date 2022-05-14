const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async(req,res)=>{
    //res.send('login route2');
    try{
        const { mail, password} = req.body;
        const user = await User.findOne({mail: mail.toLowerCase()});
        if(user && (await bcrypt.compare(password,user.password))){
            //send new token
              //create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }
        ); 

            return res.status(200).send({
                userDetails:{
                    mail: user.mail,
                    token: token,
                    username: user.username,
                }
            });
        }
        return res.status(400).send({message:"invalid credentials, try again please"});
    }catch(err){
        return res.status(500).send({message: 'something went wrong! try again please'});
    }
};

module.exports = postLogin;