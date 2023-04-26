import jwt from 'jsonwebtoken'

export const checkTokenAdm = (req, res, next) => {
    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });            
        }
        const token = req.headers.authorization.split(' ')[1];
        console.log('token', token)
        const decoded = jwt.verify(token, 'the-super-strong-secrect');
        console.log('role', decoded.role)
        if(decoded.role == 'cliente'){           
          return res.status(401).json({
                msg:'not adm'
          });                        
        }
        req.userData = decoded
        next();        
    } catch(err){
      return res.status(401).json({
        msg:'auth failed'
      });
    }    
};

export default checkTokenAdm;

