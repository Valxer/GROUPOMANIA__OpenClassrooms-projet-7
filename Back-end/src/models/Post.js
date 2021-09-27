module.exports = (sequelize, DataTypes) =>
    sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Date.now()
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
