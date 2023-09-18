const jwt = require('jsonwebtoken');

const Authenticate = (req,res,next) => {
        const authorization = req.headers.authorization;
        // console.log(authorization);
        if(authorization){
            const accessToken = authorization.split(" ")[1];
            // console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_KEY, (err,user) =>{
                if(err)   res.status(403).json({
                    success: false,
                    message: "Token bị hết hạn"
                })
                req.user = user;
                next()
            })
        }
        else{
            res.status(401).json({message: "Token là chưa được xác thực"})
        }
    }

module.exports = Authenticate;