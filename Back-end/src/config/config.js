module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'groupomania',
        user: process.env.DB_USER || 'groupomania',
        password: process.env.DB_PASS || 'groupomania',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './groupomania.sqlite'
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
