const { Review, User } = require('../models/models');

class ReviewController {
    async create(req, res) {
        try {
            const { idUser, text, rating, idRecipe } = req.body;
            
            // Проверка на наличие данных
            if (!idUser || !text) {
                return res.status(400).json({ message: "Не заполнено ID пользователя или текст" });
            }

            const review = await Review.create({ idUser, text, rating, idRecipe });

            // Подгружаем имя юзера сразу
            const reviewWithUser = await Review.findOne({
                where: { idReview: review.idReview },
                include: [{ model: User, attributes: ['name'] }]
            });

            return res.status(201).json(reviewWithUser);
        } catch (error) { // Убедись, что тут написано error
            console.error('ОШИБКА ТУТ:', error);
            return res.status(500).json({ message: 'Ошибка при создании отзыва: ' + error.message });
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [{ model: User, attributes: ['name'] }],
                order: [['createdAt', 'DESC']]
            });
            return res.json(reviews);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка получения: ' + error.message });
        }
    }

    async updateAnswer(req, res, next) {
        try {
            const { idReview, answer } = req.body;

            if (!idReview) {
                return next(ApiError.badRequest('Не указан ID отзыва'));
            }

            const review = await Review.findByPk(idReview);

            if (!review) {
                return next(ApiError.internal('Отзыв с таким ID не найден'));
            }

            review.answer = answer;
            await review.save();

            return res.json(review);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
}

module.exports = new ReviewController();