const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

function jwtSignUser(user) {            //gives a token to garantee authentication
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: '24h'
    })
}

module.exports  = {
    async signin (req, res) {
        try {
            const hash = await bcrypt.hash(req.body.password, 10)   //hashes the password
            req.body.password = hash
            const user = await User.create(req.body)    //creates a new user
            res.send(user.toJSON())
        } catch (err) {                                 // email already exists
            res.status(400).send({
                error: 'This email is already registered'
            })
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body  //grabs the data from the request
            const user = await User.findOne({   //tries to find a user with the given email               
                where: {
                    email: email
                }
            })
            if (!user) {                        //if such a user is  not found
                return res.status(401).send({
                    error: 'The login information was incorrect'
                })
            }
            const isPwdValid = await bcrypt.compare(password, user.password)  //checks if the password is correct
            if (!isPwdValid) {                                          //if not
                return res.status(401).send({
                    error: 'The login information was incorrect'
                })
            }

            const userJson = user.toJSON()      //success an we respond to the request
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {                         //if somehow the request fails
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    },

}