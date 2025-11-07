
const checkAccess = (req, res, next) => {
    console.log(req.auth.access)
    if(!req.auth || req.auth.access !== true){
        return res.status(401).json({
            status: 401,
            message: 'Your account does not have the necessary access rights.' ,
            data: null
        });
    }
    next();
};

module.exports = checkAccess