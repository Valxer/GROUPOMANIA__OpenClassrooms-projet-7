const Joi = require ('joi')

module.exports = {
    createPost (req, res, next) {
        const schema = Joi.object({     // sets the verification criteria for the creation of a new post
            userId: Joi.number().required(),
            title: Joi.string().min(2).max(140).required(),
            date: Joi.date().timestamp().default(Date.now())
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'userId':                //if the userId is at fault
                    res.status(400).send({
                        error: `The user Id is incorrect`
                    })
                    break
                case 'title':                  //if the title is at fault
                    res.status(400).send({
                        error: `The title must have between 2 and 140 characters`
                    })
                    break
                case 'date':                   //if the date is at fault
                    res.status(400).send({
                        error: 'An error occurred trying to get the date of your post'
                    })
                    break
                default:                        //if somehow there was a problem
                    res.status(400).send({
                        error: 'Invalid post informations'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
        
    }
}
