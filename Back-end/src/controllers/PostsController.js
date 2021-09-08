const {Post} = require('../models') //models

module.exports  = {
    async getFeed (req, res) {
        try {
            console.log('oui')
        } catch (err) {
            res.status(500).send({
                error: 'An error occured while loading the posts'
            })
        }
    }
}