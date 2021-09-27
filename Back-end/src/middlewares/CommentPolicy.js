const Joi = require ('joi')

module.exports = {
    createComment (req, res, next) {
        const schema = Joi.object({         // sets the verification criteria for the creation of a new post
            content: Joi.string().min(2).max(280).required(),
            date: Joi.date().timestamp().default(Date.now())
        })

        const {error} = schema.validate(req.body.comment)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'content':                        //if the name is at fault
                    res.status(400).send({
                        error: `The comment must have between 2 and 280 characters`
                    })
                    break
                case 'date':                   //if the email is at fault
                    res.status(400).send({
                        error: 'An error occurred trying to get the date of your post'
                    })
                    break
                default:                        //if somehow there was a problem
                    res.status(400).send({
                        error: 'Invalid comment informations'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
        
    }
}
