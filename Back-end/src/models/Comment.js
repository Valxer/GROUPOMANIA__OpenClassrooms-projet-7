module.exports = (sequelize, DataTypes) =>
    sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Date.now()
        }
    })
