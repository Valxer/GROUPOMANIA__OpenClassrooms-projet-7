const Joi = require ('joi')
const path = require('path')
const fs = require ('fs')

function deleteImage(filename){
    const pathFile = path.join(__dirname, `../images/${filename}`)
    fs.unlink(pathFile, () => {
        return
    })
}

module.exports = {
    signin (req, res, next) {
        const schema = Joi.object({         // sets the verification criteria for the creation of a new user
            userName: Joi.string().regex(       //using a regex
                new RegExp('^[a-zA-Z0-9]{2,20}$')
            ).required(),
            email: Joi.string().email().required(),    //using the email format given by joi
            password: Joi.string().regex(
                new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$')
            ).required(),
            role: Joi.string().alphanum().valid('admin', 'user').default('user'),
            image: Joi.string().default('https://i.imgur.com/tdi3NGa.png')
        })

        console.log('\n\nbody :', req.body)
        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'userName':                        //if the name is at fault
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    }
                    res.status(400).send({
                        error: `The name provided failed to match the following rules:
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        2. It must have between 2 and 20 characters
                        `
                    })
                    break
                case 'email':                   //if the email is at fault
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    } 
                    res.status(400).send({
                        error: 'The provided email address is invalid'
                    })
                    break
                case 'password':                //if the password is at fault
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    } 
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        1. It must contain at least one lower case character
                        2. It must contain at least one upper case character
                        3. It must contain at least one digit
                        4. It must have between 8 and 32 characters
                        `
                    })
                    break
                case 'role':                        //if the role is at fault 
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    }
                    res.status(400).send({
                        error: `role non attribué`
                    })
                    break
                case 'image':                        //if the profilePic is at fault
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    }
                    res.status(400).send({
                        error: `Choisissez une photo de profil au format .jpg .png ou .gif`
                    })
                    break
                default:                        //if somehow there was a problem
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    }
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
        
    }
}
