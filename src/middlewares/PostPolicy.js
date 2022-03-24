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
    createPost (req, res, next) {
        const schema = Joi.object({     // sets the verification criteria for the creation of a new post
            userId: Joi.number().required(),
            title: Joi.string().min(2).max(140).required(),
            date: Joi.date().timestamp(),
            image: Joi.string()
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'userId':                //if the userId is at fault
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: `The user Id is incorrect`
                    })
                    break
                case 'title':                  //if the title is at fault
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: `The title must have between 2 and 140 characters`
                    })
                    break
                case 'date':                   //if the date is at fault
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: 'An error occurred trying to get the date of your post'
                    })
                    break
                case 'image':                        //if the profilePic is at fault
                    if (req.file) {
                        deleteImage(req.file.filename) 
                    }
                    res.status(400).send({
                        error: `Choisissez une image au format .jpg .png ou .gif`
                    })
                    break
                default:                        //if somehow there was a problem
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: 'Invalid post informations'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
        
    },

    editPost (req, res, next) {
        const schema = Joi.object({     // sets the verification criteria for the creation of a new post
            userId: Joi.number().required(),
            title: Joi.string().min(2).max(140)
        })

        const {error} = schema.validate(req.body)   //returns an error if the validation fails
        if (error) {
            switch (error.details[0].context.key) { //finds the reason of the error
                case 'userId':                  //if the title is at fault
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: `Not a valid userId`
                    })
                    break
                case 'title':                  //if the title is at fault
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: `The title must have between 2 and 140 characters`
                    })
                    break
                default:                        //if somehow there was a problem
                    deleteImage(req.file.filename)    
                    res.status(400).send({
                        error: 'Invalid post informations'
                    })
            }
        } else {        //if the validation of the information was a success
            next()
        }
    }
}
