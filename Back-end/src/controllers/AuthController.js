const {User} = require('../models') //models
const jwt = require('jsonwebtoken') // used to create tokens
const config = require('../config/config')  //config file
const bcrypt = require('bcrypt')    //used to hash passwords

require('dotenv').config();
const cryptojs = require('crypto-js');                
const key = cryptojs.enc.Hex.parse(process.env.KEY);
const iv = cryptojs.enc.Hex.parse(process.env.IV);    //using a key and an iv we can make sure we get the same output for the same input (crypting not hashing)

function jwtSignUser(user) {            //gives a token to garantee authentication
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: '24h'
    })
}

module.exports  = {
    async signin (req, res) {
        try {
            req.body.email = cryptojs.AES.encrypt(req.body.email, key, { iv: iv }).toString()
            req.body.password = await bcrypt.hash(req.body.password, 10)   //hashes the password
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
                    email: cryptojs.AES.encrypt(email, key, { iv: iv }).toString()
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

    async getUser (req, res) {
        try {
            const user = await User.findOne({
                attributes:['id', 'name', 'profilePic'],
                where: {
                    id: req.body.id
                } 
            })
            if (!user) {
                res.status(404).send({
                    error: 'Couldn\'t find the user requested' 
                })
            }
            res.status(200).send(user)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch user informations'
            })
        }
    },

    async deleteUser (req, res) {
        try { 
            await User.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.status(200).send({
                message: 'Profile successfully deleted'
            })
        } catch {
            res.status(500).send ({
                error: 'An error has occured while trying to delete your profile'
            })
        }
    }

}