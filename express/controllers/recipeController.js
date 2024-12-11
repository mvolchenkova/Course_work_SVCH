const { Recipe } = require('../models/models'); 
const uuid =require("uuid")
const path=require("path")
const fs = require('fs');

class RecipeController {
    async create(req, res) {
        try {
            console.log("req.files:", req.files);
            console.log("req.body:", req.body);
            const { title, time, ingredients, instructions, img } = req.body;

            const fileName = uuid.v4() + ".jpg";
    
            imageFile.mv(path.resolve(__dirname, '..', 'static', fileName), (err) => {
                if (err) {
                    console.error("Error moving file:", err);
                    return res.status(500).json({ message: 'Error uploading image' });
                }
    
    
                Recipe.create({
                    title,
                    time,
                    ingredients: JSON.stringify(ingredients),
                    instructions: JSON.stringify(instructions),
                    img: fileName // Save the generated filename
                }).then(rec => {
                    res.status(201).json(rec);
                }).catch(error => {
                    console.error('Error creating recipe (database):', error);
                    return res.status(500).json({ message: 'Error creating recipe' });
                });
            });
        } catch (error) {
            console.error('Error creating recipe (general):', error);
            return res.status(500).json({ message: 'Error creating recipe' });
        }
    }
    async getAll(req, res) {
        try {
            const recipes = await Recipe.findAll();
            return res.json(recipes);
        } catch (error) {
            console.error('Error retrieving recipes:', error);
            return res.status(500).json({ message: 'Error retrieving recipes' });
        }
    }

    async getOne(req, res) {
        try {
            const { idRecipe } = req.params;
            const recipe = await Recipe.findByPk(idRecipe);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            console.error('Error retrieving recipe:', error);
            return res.status(500).json({ message: 'Error retrieving recipe' });
        }
    }

    async update(req, res) {
        try {
            const { idRecipe } = req.params;
            const { title, ingredients, instructions } = req.body;
            const recipe = await Recipe.findByPk(idRecipe);
    
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
    
            let fileName = recipe.img; 
    
            if (req.files && req.files.img) {
                const { img } = req.files;
    
               
                if (fileName) {
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
    
                fileName = uuid.v4() + ".jpg"; // Generate new filename
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
    
            await recipe.update({ title, ingredients, instructions, img: fileName });
            return res.json(recipe);
    
        } catch (error) {
            console.error('Error updating recipe:', error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ errors: error.errors.map(e => e.message) });
            }
            return res.status(500).json({ message: 'Error updating recipe' });
        }
    }
    

    async delete(req, res) {
        try {
            const { idRecipe } = req.params;
            const recipe = await Recipe.findByPk(idRecipe);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            await recipe.destroy();
            return res.json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return res.status(500).json({ message: 'Error deleting recipe' });
        }

    }

    // Получение списка записей с поддержкой поиска
    async search(req, res) {
        try {
            const { query } = req.query;
    
            if (!query) {
                const recipes = await Recipe.findAll();
                return res.json(recipes);
            }
    
            const recipes = await Recipe.findAll({
                where: {
                    title: { [Op.like]: `%${query}%` }, 
                },
            });
            return res.json(recipes);
        } catch (error) {
            console.error('Ошибка при поиске рецептов:', error);
            return res.status(500).json({ message: 'Ошибка при поиске рецептов' });
        }
    }
}


module.exports = new RecipeController();