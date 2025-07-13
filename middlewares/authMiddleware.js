const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.cookies?.token;
    const token = authHeader && authHeader.split(' ')[1] || authHeader;

    if (!token) {
        return res.status(401).json({
            error: 'Access denied, no token provided'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: 'Invalid token'
            });
        }

        req.user = user;
        next();
    });
};

const checkRole = (expectedRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== expectedRole) {
            return res.status(403).json({
                error: 'Access denied'
            });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    checkRole
};