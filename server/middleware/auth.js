const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

module.exports.auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(401).json({msg : "Not Authorized !"})
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({msg : "Not Authorized !"})
        }
        req.user = verified._id;
        next();
    } catch(e){
        if(e instanceof jwt.TokenExpiredError){
            if(req.originalUrl === '/api/users/refresh'){
                next();
            } else {
                return res.status(401).json({msg : "token_expired"})
            }
        } else {
            res.status(500).json({error: e});
        }
    }
}
module.exports.admin = async (req, res, next) => {
    try{
        const user = await User.findById(req.user)
        .populate({ path: 'roles', model: 'Role', select: 'label' })
        .exec();
        const adminRole = user.roles.find(elem => elem.label === 'ADMIN');
        if(!adminRole){
            return res.status(403).json({msg : "Not Authorized (Admin Route) !"})
        }
        next();
    } catch(e){
        res.status(500).json({error: e});
    }
}
module.exports.ownerOrAdmin = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(req.user)
        .populate('roles')
        .exec();
        if(user.role.label != 'ADMIN' && user._id != id){
            return res.status(403).json({msg : "Not Authorized !"})
        }
        next();
    } catch(e){
        res.status(500).json({error: e});
    }
}


