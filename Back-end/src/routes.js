const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')

module.exports = (app) => {
    //User requests
    app.post('/signin',AuthControllerPolicy.signin, AuthController.signin),
    app.post('/login', AuthController.login),
    app.delete('/profile', AuthController.deleteUser)
    //Post requests
    app.get('/feed', PostsController.getFeed),
    app.post('/post', PostsController.createPost),
    app.get('/post/:id', PostsController.getPost, CommentsController.getComments),
    app.delete('/post/:id', PostsController.deletePost),
    //Comment requests
    app.get('/post/:id/comments', CommentsController.getComments),
    app.post('/post/:id', CommentsController.createComment),
    app.delete('/comment/:id', CommentsController.deleteComment)
}
