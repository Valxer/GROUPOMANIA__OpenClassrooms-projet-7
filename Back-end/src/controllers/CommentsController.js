const {Comment} = require('../models') //models

module.exports  = {
    async getComments (req, res) {
        try {
            const comments = await Comment.findAll({
                order: [['createdAt', 'DESC']]
            })
            if (!comments) {                        //if such a user is  not found
                return res.status(404).send({
                    error: 'The comments you are looking for don\'t exist'
                })
            }
            res.send({
                comments: comments,
                message: 'commentaires récupérés !'
            })
            
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the comments'
            })
        }
    },

    async createComment (req, res) {
        try{
            const comment = await Comment.create(req.body)
            res.send(comment)
        } catch {
            res.status(500).send({
                error: 'An error occured trying to create your comment'
            })
        }
    },

    async deleteComment (req, res) {
        try {
            await Comment.destroy({   //tries to find a user with the given email               
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({
                message: 'Comment successfully deleted'
            })
        } catch {
            res.status(500).send({
                error: 'An error occured trying to delete the comment'
            })
        }
    }
}
