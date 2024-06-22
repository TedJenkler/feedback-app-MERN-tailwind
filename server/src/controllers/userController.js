const User = require("../models/userSchema");
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    res.send('Get all users');
};

exports.registerUser = async (req, res) => {
    try{
        const { firstname, lastname, username, email, password } = req.body;
        
        const checkUsername = await User.findOne({ username: username });
        if(checkUsername) {
            res.status(400).json({ message: 'Username already exists' });
        }

        const checkEmail = await User.findOne({ email: email });
        if(checkEmail) {
            res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });
        
        await newUser.save()

        res.status(200).json({ message: 'User created successfully', user: newUser })
    }catch (error) {
        console.error('Failed to register User', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};