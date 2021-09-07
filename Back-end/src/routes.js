module.exports = (app) => {
    app.post('/signin', (req, res) => {
        res.send({
            message: `Hello ${req.body.email}! User registered!`
        })
    })
}
