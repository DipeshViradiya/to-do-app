const jwt = require('jsonwebtoken');

class AuthMiddleware {
    
    requireAuth = (req, res, next) => {
  
        const token = req.headers.cookie.split("=")[1];
        
        if(token){
            jwt.verify(token, 'dipesh', (err, decodedToken) => {
                if(err){
                    res.redirect('/'); 
                } else {
                    req.email = decodedToken.email;
                    next();
                }
            })
        } else {
            res.redirect('/');
        }
    }

}

const requireAuth = new AuthMiddleware();
module.exports = requireAuth;