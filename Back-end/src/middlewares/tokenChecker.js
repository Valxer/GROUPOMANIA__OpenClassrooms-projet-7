const jwt = require('jsonwebtoken')    // package for using authentification tokens
const config = require('../config/config')  //config file
const fs = require('fs')
const path = require('path')

function deleteImage(filename){
    const pathFile = path.join(__dirname, `../images/${filename}`)
    console.log(pathFile)
    fs.unlink(pathFile, () => {
        return
    })
}

module.exports = (req, res, next) => {
    try {
        const cryptedToken = req.headers.authorization.split(' ')[1];           // reads the token from headers
        const decryptedToken = jwt.verify(cryptedToken, config.auth.jwtSecret)     // uses the key to decrypt the token
        if (req.body.userId && req.body.userId != decryptedToken.id) {         // checks if the user has the right token
            console.log('\nWrong token\n')
            if (req.file){
                deleteImage(req.file.filename)
            }
            throw 'Token invalide'
        } else {
            console.log('\ntoken validated\n')
            next();
        }
    } catch (e) {
        return res.status(400).send({
           error: e
       })
   }
};