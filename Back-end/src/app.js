const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require ('path')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));

require('./routes')(app)

sequelize.sync()    //{force: true} to clear DB
    .then(() => {
        app.listen(config.port)
        console.log(`serveur started on port : ${config.port}`)
    })
