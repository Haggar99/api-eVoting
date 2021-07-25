const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const userData = jwt.verify(token, process.env.JWT_KEY_ADMIN);
        req.userData = {
            email: userData.email,
            userId: userData.userId
        };
        next();
    } catch (error) {
    throw Error('You are not authorized to perform the current operation!');
    }
}