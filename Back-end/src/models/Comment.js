module.exports = (sequelize, DataTypes) =>
    sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
