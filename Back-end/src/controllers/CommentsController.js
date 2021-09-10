const {Comment} = require('../models') //models
const {Post} = require('../models') //models
const {User} = require('../models') //models

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
            const owner = await User.findOne({   //tries to find a user with the given email               
                where: {
                    id: req.body.userId
                }
            })
            if(!owner) {
                res.status(404).send({
                    error: 'Could not find the user trying to create this comment'
                })
            } else {
                const post = await Post.findOne({   //tries to find a user with the given email               
                    where: {
                        id: req.body.postId
                    }
                })
                if(!post) {
                    res.status(404).send({
                        error: 'Could not find the post you are trying to comment'
                    })
                } else {
                    const comment = await owner.createComment(req.body.comment)
                    post.addComment(comment)
                    res.send(comment)
                }
            }
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
