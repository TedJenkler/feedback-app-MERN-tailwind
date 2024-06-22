const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');

exports.addPost = async (req, res) => {
    try {
        const { title, description, category, user } = req.body;

        const checkUser = await User.findOne({ username: user });
        if(!checkUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const checkCategory = await Category.findOne({ name: category });
        if(!checkCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newPost = new Post({
            title,
            description,
            category: checkCategory,
            user: checkUser,
            upvotes: 0,
            date: new Date(),
            status: "new"
        });

        await newPost.save();

        checkUser.posts.push(newPost._id);
        await checkUser.save();

        checkCategory.posts.push(newPost._id);
        await checkCategory.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    }catch (error) {
        console.error('Error adding post', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};