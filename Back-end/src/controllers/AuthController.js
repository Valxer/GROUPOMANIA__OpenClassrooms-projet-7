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
            var userObject = {
                ...req.body,
                name: req.body.userName,
                profilePic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            delete userObject.userName
            console.log(userObject)
            const user = await User.create(userObject)    //creates a new user
            res.status(201).send(user.toJSON())
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

            const userJson = (({id, name, profilePic, role}) => ({id, name, profilePic, role}))(user)   //success an we respond to the request
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
                    id: req.params.id
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