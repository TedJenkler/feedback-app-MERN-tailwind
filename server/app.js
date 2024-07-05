const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const replyRoutes = require('./routes/reply');
const { default: mongoose } = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const staticPath = path.join(__dirname, '/client/dist');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/reply', replyRoutes);

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json('Something is broken')
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});