const Joi = require ('joi')

module.exports = {
    createPost (req, res, next) {
        const schema = Joi.object({         // sets the verification criteria for the creation of a new post
            title: Joi.string().min(2).max(140).required(),
            date: Joi.date().timestamp().required(),    //using the email format given by joi
            image: Joi.string().required(),
            commentCount: Joi.number().integer().default(0)
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'title':                        //if the name is at fault
                    res.status(400).send({
                        error: `The title must have between 2 and 140 characters`
                    })
                    break
                case 'date':                   //if the email is at fault
                    res.status(400).send({
                        error: 'An error occurred trying to get the date of your post'
                    })
                    break
                case 'image':                //if the password is at fault
                    res.status(400).send({
                        error: `You need to load a post image or gif`
                    })
                    break
                case 'commentCount':                        //if the profilePic is at fault
                    res.status(400).send({
                        error: `An error occurred trying to set your comment counter`
                    })
                    break
                default:                        //if somehow there was a problem
                    res.status(400).send({
                        error: 'Invalid post informations'
                    })
            }
        } else {        //if the validation of the information was a success
            console.log('everything\'s fine!', res)
            next()
        }
        
    }
}
