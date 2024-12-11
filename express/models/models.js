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
    description: {
        type: DataTypes.TEXT
    },
    lessons: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
},{
    timestamps: true,
    tableName: 'trainingplans',
})


const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
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
    diploma: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    trAim: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    finishedTr: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lastTrainingDate:{ type: DataTypes.DATE}
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

const Task = sequelize.define('Task', {
    idTask:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    idUser:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser',
    },
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: true,
    },
    dueDate: {
        type: DataTypes.DATE, 
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'), // Status of the task
        defaultValue: 'pending',
    },
},
{
    tableName: 'tasks',
    timestamps: true,
}
)

const Recipe = sequelize.define('recipe', {
    idRecipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
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
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    },
    instructions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: true,
    tableName: 'recipes',
})

const Review = sequelize.define('review', {
    idReview: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    idUser:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser',
        },
    },
    text: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    rating: {
        type: DataTypes.DOUBLE, 
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: true,
    tableName: 'reviews',
})

const Article = sequelize.define('article', {
    idArticle: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.TEXT,
        allowNull:false
    }
},{
    timestamps: true,
    tableName: 'articles',
})
 const Question = sequelize.define('question', {
    questionId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true
    }
 })

 const Advice = sequelize.define('advice', {
    adviceId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
 })
//user-favtplans
User.hasMany(FavTplan, { foreignKey: 'userIdUser', sourceKey: 'idUser' });
FavTplan.belongsTo(User, { foreignKey: 'userIdUser', targetKey: 'idUser' });

//user-review
User.hasMany(Review, { foreignKey: 'userIdUser', sourceKey: 'idUser' })
Review.belongsTo(User, { foreignKey: 'userIdUser', sourceKey: 'idUser' })

//user-tasks
User.hasMany(Task, { foreignKey: 'userIdUser', sourceKey: 'idUser' });
Task.belongsTo(User, { foreignKey: 'userIdUser', targetKey: 'idUser' });

module.exports = { User, TrainingPlan, Recipe, Review, Article, Question, Advice};