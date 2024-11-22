const { DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../db');

const TrainingPlan = sequelize.define('trainingplan', {
    idTplan: {type: DataTypes.BIGINT, primaryKey: true},
    author: {type: DataTypes.TEXT, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.TEXT, allowNull: false}
})


const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Добавьте эту строку
        allowNull: false,    // Это также должно остаться
    },
    surname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sex: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'users',
});


const FavTplan = sequelize.define('favtplans', {
    idTplan: {type: DataTypes.BIGINT, primaryKey: true, allowNull: false},
    author: {type: DataTypes.TEXT, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.TEXT, allowNull: false}
})

//user-favtplans
User.hasMany(FavTplan)
FavTplan.belongsTo(User)

module.exports = { User, FavTplan, TrainingPlan};