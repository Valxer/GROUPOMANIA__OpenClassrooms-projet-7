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
    app.post('/signin', multer, AuthControllerPolicy.signin, AuthController.signin)
    app.post('/login', AuthController.login)
    app.get('/profile', AuthController.getUser)
    app.delete('/profile/:id',tokenChecker, AuthController.deleteUser)
    //Post requests
    app.get('/feed', PostsController.getFeed)
    app.post('/post', multer, Postpolicy.createPost, tokenChecker, PostsController.createPost)
    app.get('/post/:id', tokenChecker, PostsController.getPost)
    app.put('/post/edit/:id', multer, Postpolicy.editPost, tokenChecker, PostsController.editPost)
    app.delete('/post/:id', tokenChecker, PostsController.deletePost)
    //Comment requests
    app.get('/post/:id/comments',tokenChecker, CommentsController.getComments)
    app.post('/post/:id', tokenChecker, Commentpolicy.createComment, CommentsController.createComment)
    app.delete('/comment/:id', tokenChecker, CommentsController.deleteComment)
}
