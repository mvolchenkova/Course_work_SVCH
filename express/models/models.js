const { DataTypes, DatabaseError, STRING } = require('sequelize');
const sequelize = require('../db');

const TrainingPlan = sequelize.define('trainingplan', {
    idTplan: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    author: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Имя автора не может быть пустым' },
            len: {
                args: [2, 50],
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
    }
},{
    timestamps: true,
    tableName: 'trainingplans',
})


const User = sequelize.define('User', {
    idUser: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    surname: { type: DataTypes.TEXT, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.TEXT, allowNull: false, unique: true }, // Добавлен unique
    password: { type: DataTypes.TEXT, allowNull: false },
    birthdate: { type: DataTypes.DATE, allowNull: false },
    sex: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'user' },
    diploma: { type: DataTypes.TEXT, allowNull: true },
    trAim: { type: DataTypes.INTEGER, allowNull: true },
    finishedTr: { type: DataTypes.INTEGER, allowNull: true },
    lastTrainingDate: { type: DataTypes.DATE },
    isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false }
    // favPlans и favRecipes УДАЛЕНЫ (теперь это отдельные таблицы)
}, {
    timestamps: true,
    tableName: 'users',
});

const FavTplan = sequelize.define('fav_tplan', {
    idFav: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'idUser' }
    },
    idTplan: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'trainingplans', key: 'idTplan' }
    }
}, {
    timestamps: true,
    tableName: 'fav_tplans',
});

const Task = sequelize.define('Task', {
    idTask: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'idUser' }
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'tasks',
    timestamps: true,
});

const Recipe = sequelize.define('recipe', {
    idRecipe: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.TEXT },
    time: { type: DataTypes.INTEGER }
}, { tableName: 'recipes', timestamps: true });

// 1НФ: Выносим ингредиенты (связь многие-к-одному)
const RecipeIngredient = sequelize.define('recipe_ingredient', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idRecipe: { type: DataTypes.BIGINT, references: { model: 'recipes', key: 'idRecipe' } },
    name: { type: DataTypes.TEXT, allowNull: false },
    amount: { type: DataTypes.TEXT } // Например, "200г" или "2 шт"
});

// 1НФ: Выносим инструкции (шаги приготовления)
const RecipeStep = sequelize.define('recipe_step', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idRecipe: { type: DataTypes.BIGINT, references: { model: 'recipes', key: 'idRecipe' } },
    stepNumber: { type: DataTypes.INTEGER },
    content: { type: DataTypes.TEXT, allowNull: false }
});

const Review = sequelize.define('review', {
    idReview: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idUser: { 
        type: DataTypes.INTEGER, // Тип должен совпадать с User.idUser
        allowNull: false,
        references: { model: 'users', key: 'idUser' } 
    },
    text: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    answer:{ type: DataTypes.STRING, allowNull: true}
}, { tableName: 'reviews', timestamps: true });

const Article = sequelize.define('article', {
    idArticle: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    idAuthor: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'users', key: 'idUser' } 
    }
}, { tableName: 'articles', timestamps: true });

const Question = sequelize.define('question', {
    questionId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // Связь с пользователем
    idUser: {
        type: DataTypes.INTEGER, // Важно: тип должен совпадать с User.idUser
        allowNull: false,
        references: { model: 'users', key: 'idUser' }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    // email удален: получаем его через Question.belongsTo(User) -> user.email
}, { tableName: 'questions', timestamps: true });

const Advice = sequelize.define('advice', {
    adviceId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { tableName: 'advices', timestamps: true });

const Ingredient = sequelize.define('ingredient', {
    ingredientId: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    ingredientName: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        unique: true // Чтобы не было двух "Морковок" с разными ID
    }
}, { tableName: 'ingredients', timestamps: false });


//  const Exercise = sequelize.define('exercise', {
//     idExercise: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
//     exName:{type: DataTypes.STRING, allowNull:false},
//     frontDelta: {type: DataTypes.BIGINT, allowNull:true},
//     middleDelta: {type: DataTypes.BIGINT, allowNull:true},
//     backDelta: {type: DataTypes.BIGINT, allowNull:true},
//     trapezoids: {type: DataTypes.BIGINT, allowNull:true},
//     diamondshaped: {type: DataTypes.BIGINT, allowNull:true},
//     biceps: {type: DataTypes.BIGINT, allowNull:true},
//     triceps: {type: DataTypes.BIGINT, allowNull:true},
//     bigChest: {type: DataTypes.BIGINT, allowNull:true},
//     middleChest: {type: DataTypes.BIGINT, allowNull:true},
//     smallChest: {type: DataTypes.BIGINT, allowNull:true},
//     forearm: {type: DataTypes.BIGINT, allowNull:true},
//     latissimus: {type: DataTypes.BIGINT, allowNull:true},
//     straightBelly: {type: DataTypes.BIGINT, allowNull:true},
//     externalOblique: {type: DataTypes.BIGINT, allowNull:true},
//     internalOblique: {type: DataTypes.BIGINT, allowNull:true},
//     transverse: {type: DataTypes.BIGINT, allowNull:true},
//     straightHips: {type: DataTypes.BIGINT, allowNull:true},
//     quadriceps: {type: DataTypes.BIGINT, allowNull:true},
//     bicepsHips: {type: DataTypes.BIGINT, allowNull:true},
//     bigGluteal: {type: DataTypes.BIGINT, allowNull:true},
//     middleGluteal: {type: DataTypes.BIGINT, allowNull:true},
//     smallGluteal: {type: DataTypes.BIGINT, allowNull:true},
//     gastrocnemius: {type: DataTypes.BIGINT, allowNull:true},
//     soleus: {type: DataTypes.BIGINT, allowNull:true},
//     experience: {type: DataTypes.STRING, allowNull:false},
//     predominantMuscleGroup: {type: DataTypes.STRING, allowNull:false},
//     baseIsolation: {type: DataTypes.STRING, allowNull:false},
//     type: {type: DataTypes.STRING, allowNull:true},
//     restrictions: {type: DataTypes.STRING, allowNull: true},
//     equipment: {type: DataTypes.STRING}

//  })

const Exercise = sequelize.define('exercise', {
    idExercise: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    exName: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    experience: { 
        type: DataTypes.STRING, 
        allowNull: false // Новичок, Средний, Профи
    },
    baseIsolation: { 
        type: DataTypes.STRING, 
        allowNull: false // База или Изоляция
    },
    type: { 
        type: DataTypes.STRING, 
        allowNull: true // Силовое, Растяжка и т.д.
    },
    equipment: { 
        type: DataTypes.STRING, 
        allowNull: true // Гантели, Штанга, Собственный вес
    },
    restrictions: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    tableName: 'exercises',
    timestamps: true
});

const Muscle = sequelize.define('muscle', {
    idMuscle: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    muscleName: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true // Например: 'Бицепс', 'Квадрицепс'
    },
    muscleGroup: { 
        type: DataTypes.STRING, 
        allowNull: false // Группа: 'Руки', 'Ноги', 'Спина'
    }
}, {
    tableName: 'muscles',
    timestamps: false
});

const ExerciseMuscle = sequelize.define('exercise_muscle', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    idExercise: {
        type: DataTypes.BIGINT,
        references: { model: 'exercises', key: 'idExercise' }
    },
    idMuscle: {
        type: DataTypes.BIGINT,
        references: { model: 'muscles', key: 'idMuscle' }
    },
    loadValue: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 0,
        comment: 'Процент или коэффициент нагрузки на данную мышцу'
    },
    isPrimary: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        comment: 'Является ли мышца основной в этом упражнении'
    }
}, {
    tableName: 'exercise_muscles',
    timestamps: false
});



const Instruction = sequelize.define('instruction', {
    instructionId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idExercise: { 
        type: DataTypes.BIGINT, 
        references: { model: 'exercises', key: 'idExercise' } 
    },
    stepNumber: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'instructions' });

// Справочник продуктов (общая база)
const Product = sequelize.define('product', {
    productId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    productName: { type: DataTypes.TEXT, allowNull: false },
    calories: { type: DataTypes.DOUBLE, defaultValue: 0 }, 
    protein: { type: DataTypes.DOUBLE, defaultValue: 0 },
    fat: { type: DataTypes.DOUBLE, defaultValue: 0 },
    carbs: { type: DataTypes.DOUBLE, defaultValue: 0 }
});

// Дневник питания (записи пользователя)
const MealLog = sequelize.define('meal_log', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    idUser: {                      // ВОТ ЭТОГО У ТЕБЯ НЕ БЫЛО
        type: DataTypes.INTEGER,
        allowNull: false
    },

    idProduct: {                   // тоже обычно нужно
        type: DataTypes.INTEGER,
        allowNull: false
    },

    mealType: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    grams: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },

    recordedCalories: { type: DataTypes.INTEGER },
    recordedProtein: { type: DataTypes.FLOAT },
    recordedFat: { type: DataTypes.FLOAT },
    recordedCarbs: { type: DataTypes.FLOAT },

    date: { 
        type: DataTypes.DATEONLY, 
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'meal_log',   // важно
    timestamps: false
});

const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
        type: DataTypes.BIGINT,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  const Weight = sequelize.define('Weight', {
     id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
        type: DataTypes.BIGINT,
    },
    weight: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
  })

// //user-favtplans
// User.hasMany(FavTplan, { foreignKey: 'userIdUser', sourceKey: 'idUser' });
// FavTplan.belongsTo(User, { foreignKey: 'userIdUser', targetKey: 'idUser' });

// //user-tasks
// User.hasMany(Task, { foreignKey: 'userIdUser', sourceKey: 'idUser' });
// Task.belongsTo(User, { foreignKey: 'userIdUser', targetKey: 'idUser' });

// --- СВЯЗИ ДЛЯ ПОЛЬЗОВАТЕЛЯ И ЗАДАЧ ---
User.hasMany(Task, { foreignKey: 'idUser' });
Task.belongsTo(User, { foreignKey: 'idUser' });

// --- СВЯЗИ ДЛЯ ДНЕВНИКА ПИТАНИЯ (MEAL LOG) ---
User.hasMany(MealLog, { foreignKey: 'idUser' });
MealLog.belongsTo(User, { foreignKey: 'idUser' });

Product.hasMany(MealLog, { foreignKey: 'idProduct' });
MealLog.belongsTo(Product, { foreignKey: 'idProduct' });

// --- СВЯЗИ ДЛЯ ИЗБРАННОГО (MANY-TO-MANY) ---
// Избранные планы
User.belongsToMany(TrainingPlan, { through: FavTplan, foreignKey: 'idUser' });
TrainingPlan.belongsToMany(User, { through: FavTplan, foreignKey: 'idTplan' });

// Избранные рецепты (FavRecipe нужно объявить аналогично FavTplan)
User.belongsToMany(Recipe, { through: 'fav_recipes', foreignKey: 'idUser' });
Recipe.belongsToMany(User, { through: 'fav_recipes', foreignKey: 'idRecipe' });

// --- СВЯЗИ ДЛЯ УПРАЖНЕНИЙ И АНАТОМИИ ---
Exercise.belongsToMany(Muscle, { through: ExerciseMuscle, foreignKey: 'idExercise' });
Muscle.belongsToMany(Exercise, { through: ExerciseMuscle, foreignKey: 'idMuscle' });

// Инструкции к упражнениям
Exercise.hasMany(Instruction, { foreignKey: 'idExercise' });
Instruction.belongsTo(Exercise, { foreignKey: 'idExercise' });

// --- СВЯЗИ ДЛЯ РЕЦЕПТОВ ---
Recipe.hasMany(RecipeIngredient, { foreignKey: 'idRecipe' });
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'idRecipe' });

Recipe.hasMany(RecipeStep, { foreignKey: 'idRecipe' });
RecipeStep.belongsTo(Recipe, { foreignKey: 'idRecipe' });

// --- СВЯЗИ ДЛЯ ВОПРОСОВ И ОТЗЫВОВ ---
User.hasMany(Question, { foreignKey: 'idUser' });
Question.belongsTo(User, { foreignKey: 'idUser' });

User.hasMany(Review, { foreignKey: 'idUser' });
Review.belongsTo(User, { foreignKey: 'idUser' });


module.exports = { 
    User, 
    TrainingPlan, 
    Recipe, 
    Review, 
    Article, 
    Question, 
    Advice, 
    Ingredient, 
    Instruction,
    Exercise,
    Product,
    MealLog, 
    Note,
    Weight
};