const jwt = require('jsonwebtoken');    // package for using authentification tokens
const config = require('../config/config')  //config file

module.exports = (req,res, next) => {
    try {
        const cryptedToken = req.headers.authorization.split(' ')[1];           // reads the token from headers
        const decryptedToken = jwt.verify(cryptedToken, config.auth.jwtSecret);     // uses the key to decrypt the token
        if (req.body.userId && req.body.userId !== decryptedToken.id && decryptedToken.role != 'admin') {         // checks if the user has the right token to the request
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error | 'Unauthorized request.' });
    }
};