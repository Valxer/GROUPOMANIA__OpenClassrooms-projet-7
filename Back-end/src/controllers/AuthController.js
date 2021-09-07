const {User} = require('../models')

module.exports  = {
    async signin (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This email is already registered'
            })
            // email already exists
        }
    }
}