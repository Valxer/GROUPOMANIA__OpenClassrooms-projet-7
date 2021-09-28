const AuthController = require('./controllers/AuthController')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')

const AuthControllerPolicy = require('./middlewares/AuthControllerPolicy')
const Postpolicy = require('./middlewares/PostPolicy')
const Commentpolicy = require('./middlewares/CommentPolicy')
// const multer = require('./middlewares')

module.exports = (app) => {
    //User requests
    app.post('/signin',AuthControllerPolicy.signin, AuthController.signin)
    app.post('/login', AuthController.login)
    app.get('/profile', AuthController.getUser)
    app.delete('/profile/:id', AuthController.deleteUser)
    //Post requests
    app.get('/feed', PostsController.getFeed)
    app.post('/post', Postpolicy.createPost, PostsController.createPost)
    app.get('/post/:id', PostsController.getPost)
    app.put('/post/edit/:id', PostsController.editPost)
    app.delete('/post/:id', PostsController.deletePost)
    //Comment requests
    app.get('/post/:id/comments', CommentsController.getComments)
    app.post('/post/:id', Commentpolicy.createComment, CommentsController.createComment)
    app.delete('/comment/:id', CommentsController.deleteComment)
}
