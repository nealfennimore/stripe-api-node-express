const jwt = require('jsonwebtoken');

const {
    AUTH_SECRET,
    AUTH_ALGORITHM
} = process.env;

const verifyOptions = { algorithms: [AUTH_ALGORITHM] };

function removeBearer(token){
    return token.replace(/Bearer/, '').trim();
}

function authenticate(req, res, next) {
    const token = removeBearer( req.headers['authorization'] || '' );

    if (token) {
        jwt.verify(token, AUTH_SECRET, verifyOptions, function(err, decoded) {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: 'Failed to authenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // No token
        return res.status(403).json({
            error: true,
            message: 'No token'
        });
    }
}

function sign(data={}){
    return jwt.sign(data, AUTH_SECRET, { algorithm: AUTH_ALGORITHM });
}

module.exports = {
    authenticate,
    sign
};