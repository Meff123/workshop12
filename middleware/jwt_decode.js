const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = decode;
        req.userData = {
            userID: decode.id,
            userName: decode.username,
            userRole: decode.role,
            userAccess: decode.access
        }
        return next();
    }catch (error) {
        return res.status(401).json({ 
            status: 401,
            message: 'Failed to verify identity',
            data: null})
    }
}