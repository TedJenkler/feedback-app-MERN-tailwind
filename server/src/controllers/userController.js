const User = require("../models/userSchema");
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();

        res.status(200).json({ message: 'Users fetched succesfully', users});
    }catch (error) {
        console.error('Failed to get Users', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.getOneUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        res.status(200).json({ message: 'User fetched succesfully', user})
    }catch (error) {
        console.error('Failed fetching User by id', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.getOneUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        res.status(200).json({ message: 'User fetched succesfully', user})
    }catch (error) {
        console.error('Failed fetching User by email', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.getOneUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        res.status(200).json({ message: 'User fetched succesfully', user});
    }catch (error) {
        console.error('Failed fetching User by username', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
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