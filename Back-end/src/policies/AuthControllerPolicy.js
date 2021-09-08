const Joi = require ('joi')

module.exports = {
    signin (req, res, next) {
        const schema = Joi.object({         // sets the verification criteria for the creation of a new user
            name: Joi.string().regex(       //using a regex
                new RegExp('^[a-zA-Z0-9]{2,15}$')
            ),
            email: Joi.string().email(),    //using the email format given by joi
            password: Joi.string().regex(
                new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'name':                        //if the name is at fault
                    res.status(400).send({
                        error: `The name provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        <br>
                        2. It must have between 2 and 15 characters
                        `
                    })
                    break
                case 'email':                   //if the email is at fault
                    res.status(400).send({
                        error: 'The provided email address is invalid'
                    })
                    break
                case 'password':                //if the password is at fault
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain at least one lower case character
                        <br>
                        2. It must contain at least one upper case character
                        <br>
                        3. It must contain at least one digit
                        <br>
                        4. It must have between 8 and 32 characters
                        `
                    })
                    break
                default:                        //if somehow there was a problem
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
        
    }
}
