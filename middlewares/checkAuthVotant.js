const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const userData = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {
            email: userData.email,
            userId: userData.userId
        };
        console.log(userData);
        next();
    } catch (error) {
    throw Error('You are not authorized to perform the current operation!');
    }
}