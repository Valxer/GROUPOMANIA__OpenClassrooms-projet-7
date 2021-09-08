module.exports = (sequelize, DataTypes) =>
    sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
