const Joi = require ('joi')

module.exports = {
    createComment (req, res, next) {
        const schema = Joi.object({         // sets the verification criteria for the creation of a new post
            content: Joi.string().min(2).max(280).required(),
            ownerId: Joi.number().integer().required(),
            date: Joi.date().timestamp().required(),    //using the email format given by joi
            postId: Joi.number().integer().required()
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'content':                        //if the name is at fault
                    res.status(400).send({
                        error: `The comment must have between 2 and 280 characters`
                    })
                    break
                case 'ownerId':                        //if the profilePic is at fault
                    res.status(400).send({
                        error: `Not a valid ownerId`
                    })
                    break
                case 'date':                   //if the email is at fault
                    res.status(400).send({
                        error: 'An error occurred trying to get the date of your post'
                    })
                    break
                case 'postId':                //if the password is at fault
                    res.status(400).send({
                        error: `Not a valid postId`
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
