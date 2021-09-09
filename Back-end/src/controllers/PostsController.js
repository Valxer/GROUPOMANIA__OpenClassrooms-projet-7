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
        } catch (err) {
            console.log('we are here', err)
            res.status(500).send({
                error: 'An error occured while creating the post'
            })
        }
    }
}