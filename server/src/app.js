const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const { default: mongoose } = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json('Something is broken')
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});