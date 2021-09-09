const {Post} = require('../models') //models

module.exports  = {
    async getFeed (req,res) {
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

    async getPost (req, res) {
        try {
            const post = await Post.findOne({   //tries to find a user with the given email               
                where: {
                    id: req.params.id
                }
            })
            if (!post) {                        //if such a user is  not found
                return res.status(404).send({
                    error: 'Could not find the post required'
                })
            }
            res.send(post)
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the post'
            })
        }
    }
}