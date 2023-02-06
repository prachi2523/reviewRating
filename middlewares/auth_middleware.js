const userSchema = require('../model/usermoduleSchema')
const jwt = require('jsonwebtoken')


const checkAuth = async (req, res, next) => {
    let authorization;
    authorization = req.headers['authorization'];

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            let token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userSchema.findById(userID).select('-password');
            next();
        }
        catch (err) {
            res.status(401).send({
                status: "failed",
                message: "unauthorised user"
            })
        }
    }
    if (!authorization) {
        res.send({
            message: "no token"
        })
    }
}

module.exports = { checkAuth };
