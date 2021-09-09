const {Post} = require('../models') //models
const {Comment} = require('../models')

module.exports  = {
    async getFeed (req, res) {
        try {
            const posts = await Post.findAll({
                limit: 20,
                order: [['createdAt', 'DESC']]
            })
            res.send(posts)
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the posts'
            })
        }
    },

    async createPost (req, res) {
        try {
            const post = await Post.create(req.body)
            res.send(post)
        } catch {
            res.status(500).send({
                error: 'An error occured while creating the post'
            })
        }
    },

    async getPost (req, res, next) {
        try {
            const post = await Post.findOne({   //tries to find a user with the given email               
                where: {
                    id: req.params.id
                }
            })
            if (!post) {                        //if such a user is  not found
                return res.status(404).send({
                    error: 'The post you are looking for doesn\'t exist'
                })
            }
            const comments = await Comment.findAll({
                where: {
                    postId: req.params.id
                },
                order: [['createdAt', 'DESC']]
            })
            if (!comments) {                        //if such a user is  not found
                return res.status(404).send({
                    error: 'The comments you are looking for don\'t exist'
                })
            }
            res.send({
                post: post,
                comments: comments
            })
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the post'
            })
        }
    },

    async deletePost (req, res) {
        try {
            await Post.destroy({   //tries to find a user with the given email               
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({
                message: 'Post successfully deleted'
            })
        } catch {
            res.status(500).send({
                error: 'An error occured trying to delete the post'
            })
        }
    }
}