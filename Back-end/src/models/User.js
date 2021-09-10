module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            validate: {
                isIn: { 
                    args: [['user', 'admin']],
                    msg: 'Must be either user or admin'
                }
            },
            defaultValue: 'user'
        }
    })
