const Joi = require ('joi')

module.exports = {
    signin (req, res, next) {
        const schema = Joi.object({
            name: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{2,15}$')
            ),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)
        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: `The name provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        <br>
                        2. It must have between 2 and 15 characters
                        `
                    })
                    break
                case 'email':
                    res.status(400).send({
                        error: 'The provided email address is invalid'
                    })
                    break
                case 'password':
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
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
        
    }
}
