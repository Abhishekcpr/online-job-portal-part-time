const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    
    const token = req.headers['authorization'];

    if (!token) {
        // console.log("No token");
        
        return res.status(403).json({ msg: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            // console.log("Unauthorized...");
            
            return res.status(401).send({ msg: 'You are not authorized!' });
        }
        req.userId = decoded.id; 
        next();
    });
};

module.exports = verifyToken;
