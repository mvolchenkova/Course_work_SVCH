const { DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../db');

const TrainingPlan = sequelize.define('trainingplan', {
    idTplan: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Имя автора не может быть пустым' },
            len: {
                args: [10, 50],
                msg: 'Имя автора должно содержать от 10 до 50 символов'
            }
        }
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Название не может быть пустым' },
            len: {
                args: [10, 50],
                msg: 'Название должно содержать от 10 до 50 символов'
            }
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Количество тренировок не может быть пустым' },
            is: {
                args: /^[0-9]+$/,
                msg: 'Количество тренировок должно содержать только цифры'
            }
        }
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: { msg: 'Ссылка на картинку не может быть пустой' },
    },
    
},{
    timestamps: true,
    tableName: 'trainingplans',
})


const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,    
    },
    surname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Фамилия не может быть пустой' },
            len: {
                args: [2, 50],
                msg: 'Фамилия должна содержать от 2 до 50 символов'
            }
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Имя не может быть пустым' },
            len: {
                args: [2, 50],
                msg: 'Имя должно содержать от 2 до 50 символов'
            }
        }
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Телефон не может быть пустым' },
            is: {
                args: /^[0-9]+$/,
                msg: 'Телефон должен содержать только цифры'
            },
            len: {
                args: [10, 15],
                msg: 'Телефон должен содержать от 10 до 15 цифр'
            }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Пароль не может быть пустым' },
            len: {
                args: [6, 100],
                msg: 'Пароль должен содержать от 6 до 100 символов'
            }
        }
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
        defaultValue: 'user'
    },
}, {
    timestamps: true,
    tableName: 'users',
});


const FavTplan = sequelize.define('favtplans', {
    idTplan: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Имя автора не может быть пустым' },
            len: {
                args: [10, 50],
                msg: 'Имя автора должно содержать от 10 до 50 символов'
            }
        }
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Название не может быть пустым' },
            len: {
                args: [10, 50],
                msg: 'Название должно содержать от 10 до 50 символов'
            }
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Количество тренировок не может быть пустым' },
            is: {
                args: /^[0-9]+$/,
                msg: 'Количество тренировок должно содержать только цифры'
            }
        }
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: { msg: 'Ссылка на картинку не может быть пустой' },
    },
    userIdUser: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser',
        },
    }
},{
    timestamps: true,
    tableName: 'favtplans',
})

//user-favtplans
User.hasMany(FavTplan, { foreignKey: 'userIdUser', sourceKey: 'idUser' });
FavTplan.belongsTo(User, { foreignKey: 'userIdUser', targetKey: 'idUser' });

module.exports = { User, FavTplan, TrainingPlan};