const { FavTplan } = require('../models/models');

class favTplanController {
    async create(req, res) {
        const { idTplan, author, title, amount, img } = req.body;
        const favtplan = await FavTplan.create({ idTplan, author, title, amount, img });
        return res.json(favtplan);
    }

    async getAll(req, res) {
        const favtplan = await FavTplan.findAll();
        return res.json(favtplan);
    }
}

module.exports = new favTplanController();