const { TrainingPlan } = require('../models/models')

class tplanController {
    async create(req,res) {
        const{ idTplan, author, title, amount, img } = req.body
        const tplan = await TrainingPlan.create({ idTplan, author, title, amount, img })
        return res.json(tplan)
    }

    async getAll(req,res) {
        const tplan = await TrainingPlan.findAll()
        return res.json(tplan)
    }
}

module.exports = new tplanController();