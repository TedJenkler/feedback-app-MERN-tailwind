const Post = require('../models/postSchema');
const Reply = require('../models/replySchema');
const User = require('../models/userSchema');
const Category = require('../models/categorySchema');
const Comment = require('../models/commentSchema');

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.status(200).json({ message: 'Posts fetched successfully', posts });
  } catch (error) {
    console.error('Failed fetching posts', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'No post found' });
    }

    res.status(200).json({ message: 'Post fetched successfully', post });
  } catch (error) {
    console.error('Failed fetching post', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { title, description, category, status, user } = req.body;

    const checkUser = await User.findOne({ username: user });
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newPost = new Post({
      title,
      description,
      category: checkCategory,
      user: checkUser,
      upvotes: 0,
      date: new Date(),
      status: 'planned',
    });

    await newPost.save();

    checkUser.posts.push(newPost._id);
    await checkUser.save();

    checkCategory.posts.push(newPost._id);
    await checkCategory.save();

    res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error adding post', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePostByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, category } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (category && category.trim() !== '') {
      const checkCategory = await Category.findById(category);
      if (!checkCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      if (title) post.title = title;
      if (description) post.description = description;
      if (status) post.status = status;
      post.category = checkCategory._id;

      await post.save();

      if (post.category.toString() !== checkCategory._id.toString()) {
        await Category.updateOne(
          { _id: post.category },
          { $pull: { posts: post._id } }
        );
      }

      checkCategory.posts.push(post._id);
      await checkCategory.save();
    } else {
      if (title) post.title = title;
      if (description) post.description = description;
      if (status) post.status = status;

      await post.save();
    }

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
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

    await User.updateOne({ _id: post.user }, { $pull: { posts: post._id } });

    await Category.updateOne(
      { _id: post.category },
      { $pull: { posts: post._id } }
    );

    res.status(200).json({ message: 'Post deleted successfully', post });
  } catch (error) {
    console.error('Error deleting post', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.upvotePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, toggle } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (toggle) {
      if (!post.upvotes.users.includes(user._id)) {
        post.upvotes.users.push(user._id);
        post.upvotes.totalUpvotes++;
      } else {
        return res
          .status(400)
          .json({ message: 'User has already upvoted this post' });
      }
    } else {
      if (post.upvotes.users.includes(user._id)) {
        post.upvotes.users = post.upvotes.users.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        post.upvotes.totalUpvotes--;
      } else {
        return res
          .status(400)
          .json({ message: 'User has not upvoted this post' });
      }
    }

    await post.save();

    res.status(200).json({ message: 'Upvote toggled successfully', post });
  } catch (error) {
    console.error('Error upvoting post', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deleteResult = await Post.deleteMany();

    if (deleteResult.deletedCount === 0) {
      console.log('No posts found');
    }

    const categoryResult = await Comment.deleteMany();

    if (categoryResult.deletedCount === 0) {
      console.log('No comments found');
    }

    const replyResult = await Reply.deleteMany();

    if (replyResult.deletedCount === 0) {
      console.log('No replies found');
    }

    const updateUsersResult = await User.updateMany(
      {},
      { posts: [], comments: [], replies: [] }
    );
    console.log('Updated users:', updateUsersResult);

    res.status(200).json({ message: 'Deleted all successfully' });
  } catch (error) {
    console.error('Error deleting all documents', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
