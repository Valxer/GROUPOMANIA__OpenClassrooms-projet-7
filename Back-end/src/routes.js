const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {
    app.post('/signin',AuthControllerPolicy.signin, AuthController.signin)
}
