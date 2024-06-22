const Category = require('../models/categorySchema');

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const checkCategory = await Category.findOne({ name: name });
        if (checkCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        const category = new Category({
          name,
          posts: []
        });

        await category.save();

        res.status(200).json({ message: 'Category added successfully', category });
    }catch (error) {
        console.error('Error adding category', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
};