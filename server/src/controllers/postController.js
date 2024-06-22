const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');

exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        if(posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        res.status(200).json({ message: 'Posts fetched successfully', posts });
    }catch (error) {
        console.error('Failed fetching posts', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if(!post) {
            return res.status(404).json({ message: 'No post found' });
        }

        res.status(200).json({ message: 'Post fetched successfully', post });
    }catch (error) {
        console.error('Failed fetching post', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

exports.updatePostByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, category } = req.body;

        const post = await Post.findById(id);
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const checkCategory = await Category.findOne({ name: category });
        if(!checkCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if(title) post.title = title;
        if(description) post.description = description;
        if(status) post.status = status;
        if (category) post.category = checkCategory._id

        await post.save();

        const oldCategory = await Category.findOne({ posts: post._id });
        if (oldCategory && oldCategory._id.toString() !== checkCategory._id.toString()) {
            oldCategory.posts = oldCategory.posts.filter(p => p.toString() !== post._id.toString());
            await oldCategory.save()
        }

        checkCategory.posts.push(post._id);
        await checkCategory.save();

        res.status(200).json({ message: 'Post updated successfully', post })
    }catch (error) {
        console.error('Error updating post', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
};

exports.deletePostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(post.user);
        if (user) {
            user.posts = user.posts.filter(p => p.toString() !== post._id.toString());
            await user.save();
        }

        const oldCategory = await Category.findOne({ posts: post._id });
        if (oldCategory && oldCategory._id.toString() !== post.category.toString()) {
            oldCategory.posts = oldCategory.posts.filter(p => p.toString() !== post._id.toString());
            await oldCategory.save();
        } else if (oldCategory) {
            // Remove the post ID from the old category's posts array
            oldCategory.posts = oldCategory.posts.filter(p => p.toString() !== post._id.toString());
            await oldCategory.save();
        }

        res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error) {
        console.error('Error deleting post', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};