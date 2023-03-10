const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'my_secrete_key');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Please Log in'
        });
    }
};