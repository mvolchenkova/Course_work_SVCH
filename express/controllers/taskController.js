const { User } = require('../models/models');
const { Op } = require('sequelize');

class TaskController {
    // Create a new task
    async create(req, res) {
        const { title, description, dueDate, userId } = req.body;

        try {
            const task = await Task.create({ title, description, dueDate, userId });
            return res.status(201).json(task);
        } catch (error) {
            console.error('Error creating task:', error);
            return res.status(500).json({ message: 'Failed to create task' });
        }
    }

    // Get all tasks
    async getAll(req, res) {
        try {
            const tasks = await Task.findAll();
            return res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ message: 'Failed to fetch tasks' });
        }
    }

    // Get a task by ID
    async getById(req, res) {
        const { id } = req.params;

        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json(task);
        } catch (error) {
            console.error('Error fetching task:', error);
            return res.status(500).json({ message: 'Failed to fetch task' });
        }
    }

    // Update a task
    async update(req, res) {
        const { id } = req.params;
        const { title, description, dueDate, status } = req.body;

        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update task fields
            task.title = title !== undefined ? title : task.title;
            task.description = description !== undefined ? description : task.description;
            task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
            task.status = status !== undefined ? status : task.status;

            await task.save();
            return res.status(200).json(task);
        } catch (error) {
            console.error('Error updating task:', error);
            return res.status(500).json({ message: 'Failed to update task' });
        }
    }

    // Delete a task
    async delete(req, res) {
        const { id } = req.params;

        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            await task.destroy();
            return res.status(204).send(); // No content on successful deletion
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ message: 'Failed to delete task' });
        }
    }
}
module.exports = new TaskController();