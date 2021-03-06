const {Post, sequelize} = require('../models') //models
const {User} = require('../models') //models
const {Comment} = require('../models')
const fs = require ('fs')
const path = require('path')

function deleteImage(filename){
    const pathFile = path.join(__dirname, `../images/${filename}`)
    fs.unlink(pathFile, () => {
        return
    })
}

module.exports  = {
    async getFeed (req, res) {
        try {
            const posts = await Post.sequelize.query('SELECT Posts.id, Posts.title, Posts.date, Posts.image, Posts.commentCount, Users.name, Users.profilePic FROM Posts LEFT JOIN Users ON Posts.ownerId = Users.id ORDER BY Posts.createdAt DESC LIMIT 0,30',
                {type: sequelize.QueryTypes.SELECT}
            )
            //Updating the commentCount in case of a user deletion that also deleted some comments
             Object.entries(posts).forEach(async entry => {
                const[key, value] = entry
                commentCount = await Comment.count({
                    where: {
                        postId: value.id
                    }
                })
                if (value.commentCount != commentCount) {
                    value.commentCount = commentCount
                    await Post.update(value, {
                        where: {
                            id: value.id
                        }
                    })
                }
            })
            res.send(posts)
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the posts'
            })
        }
    },

    async createPost (req, res) {
        try{
            const owner = await User.findOne({
                where: {
                    id: req.body.userId
                }
            })
            if(!owner) {
                res.status(404).send({
                    error: 'Could not find the user trying to create this post'
                })
            } else {
                var postObject = {}
                var postObject = {
                    ...req.body,
                    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                delete postObject.userId
                const post = await owner.createPost(postObject)
                if(!post) {
                    res.status(500).send({
                        error: 'An error occurred while attributting values to the post'
                    })
                }
                res.status(201).send(post)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    },

    async getPost (req, res) {
        try {
            const post = await Post.sequelize.query('SELECT Posts.id, Posts.title, Posts.date, Posts.image, Posts.commentCount, Posts.ownerId, Users.name, Users.profilePic FROM Posts INNER JOIN Users ON Posts.ownerId = Users.id WHERE Posts.id = :id',
                {
                    replacements: {
                        id : req.params.id
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            if (!post) {                        //if such a post is  not found
                return res.status(404).send({
                    error: 'The post you are looking for doesn\'t exist'
                })
            }
            const comments = await Comment.sequelize.query('SELECT Users.name, Users.id AS userId, Users.profilePic, Comments.id, Comments.content, Comments.date FROM Comments LEFT JOIN Users ON Comments.ownerId = Users.id WHERE Comments.PostId = :id ORDER BY Comments.createdAt DESC LIMIT 0,30',
                {
                    replacements: {
                        id : req.params.id
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            if (!comments) {                        //if such a comment is  not found
                return res.status(404).send({
                    error: 'The comments you are looking for don\'t exist'
                })
            }
            const postJson = post[0]
            res.send({
                post: postJson,
                comments: comments
            })
        } catch {
            res.status(500).send({
                error: 'An error occured trying to fetch the post'
            })
        }
    },

    async editPost (req, res) {
        const postObject = req.file ? {
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }

        try {
            const post = await Post.findOne({   //suppresses the given post             
                where: {
                    id: req.params.id
                }
            })
            if(!post) {
                res.status(404).send({
                    error: 'Couldn\'t find the post you want to edit...'
                })
            } else {
                if (postObject.userId != post.ownerId) {    //checks if the user passed in the request is the Post owner or has admin rights
                    const user = await User.findOne({
                        where: {
                            id: postObject.userId
                        }
                    })
                    if (!user) {
                        deleteImage(req.file.filename)
                        throw 'Couldn\'t find the user that wants to edit the post'
                    } else if (user.role != 'admin'){
                        deleteImage(req.file.filename)
                        throw 'You don\'t have the rights to modify this post'
                    }
                }
                if (req.file){                 //checks if there's a file in the request
                    const filename = post.image.split('/images/')[1]
                    deleteImage(filename)
                }
            }
        } catch (e) {
             return res.status(400).send({
                error: e
            })
        }

        delete postObject.userId
        // console.log(postObject) ownerid = userid ou admin

        try {
            const newPost = await Post.update(postObject, {
                where: {
                    id: req.params.id
                }
            })
            if (!newPost) {
                return res.status(404).send({
                    error: 'Couldn\'t update the Post'
                })
            }
            const updated = await Post.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(updated)
        } catch {
            return res.status(500).send({
                error: 'An error occured trying to update the Post'
            })
        }
    },

    async deletePost (req, res) {
        try {
            const post = await Post.findOne({   //suppresses the given post             
                where: {
                    id: req.params.id
                }
            })
            if(!post) {
                res.status(404).send({
                    error: 'Couldn\'t find the post you want to delete...'
                })
            } else {
                const filename = post.image.split('/images/')[1]
                const pathFile = path.join(__dirname, `../images/${filename}`)
                fs.unlink(pathFile, async () => {
                    await Post.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    res.status(200).send({
                        message: 'Post successfully deleted'
                    })
                })
            }
        } catch {
            return res.status(500).send({
                error: 'An error occured trying to delete the post'
            })
        }
    }
}