const AuthController = require('./controllers/AuthController')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')

const AuthControllerPolicy = require('./middlewares/AuthControllerPolicy')
const Postpolicy = require('./middlewares/PostPolicy')
const Commentpolicy = require('./middlewares/CommentPolicy')
const multer = require('./middlewares/multer-config')
const tokenChecker = require('./middlewares/tokenChecker')

module.exports = (app) => {
    //User requests
    app.post('/api/signin', multer, AuthControllerPolicy.signin, AuthController.signin)
    app.post('/api/login', AuthController.login)
    app.get('/api/profile', AuthController.getUser)
    app.delete('/api/profile/:id',tokenChecker, AuthController.deleteUser)
    //Post requests
    app.get('/api/feed', PostsController.getFeed)
    app.post('/api/post', multer, Postpolicy.createPost, tokenChecker, PostsController.createPost)
    app.get('/api/post/:id', tokenChecker, PostsController.getPost)
    app.put('/api/post/edit/:id', multer, Postpolicy.editPost, tokenChecker, PostsController.editPost)
    app.delete('/api/post/:id', tokenChecker, PostsController.deletePost)
    //Comment requests
    app.get('/api/post/:id/comments',tokenChecker, CommentsController.getComments)
    app.post('/api/post/:id', tokenChecker, Commentpolicy.createComment, CommentsController.createComment)
    app.delete('/api/comment/:id', tokenChecker, CommentsController.deleteComment)
}
