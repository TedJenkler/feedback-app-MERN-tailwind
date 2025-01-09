const Category = require('../models/categorySchema');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res
      .status(200)
      .json({ message: 'Categories fetched successfully', categories });
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res
      .status(200)
      .json({ message: 'Category fetched successfully', category });
  } catch (error) {
    console.error('Error fetching category', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;

    const category = await Category.findOne({ name: name });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }

    res
      .status(200)
      .json({ message: 'Category fetched successfully', category });
  } catch (error) {
    console.error('Error fetching category', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const checkCategory = await Category.findOne({ name: name });
    if (checkCategory) {
      return res.status(400).json({ message: 'Category name already exists' });
    }

    const category = new Category({
      name,
      posts: [],
    });

    await category.save();

    res.status(200).json({ message: 'Category added successfully', category });
  } catch (error) {
    console.error('Error adding category', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const checkName = await Category.findOne({ name: name });
    if (checkName) {
      res.status(400).json({ message: 'Category name already exsist' });
    }

    if (name) category.name = name;

    await category.save();

    res
      .status(200)
      .json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res
      .status(200)
      .json({ message: 'Category deleted successfully', category });
  } catch (error) {
    console.error('Error deleting category', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteAllCategories = async (req, res) => {
  try {
    const result = await Category.deleteMany({});
    res
      .status(200)
      .json({ message: 'Categories deleted successfully', result });
  } catch (error) {
    console.error('Error deleting all categories', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
