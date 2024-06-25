const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-email -password');

        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        console.error('Failed to get Users', error);
        res.status(500).json({ message: 'Internal Server Error' });
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

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if(!user) {
            return res.status(404).json({ message: 'User dosent exsist' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, user });
    }catch (error) {
        console.error('Failed login in', error);
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

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, username, password, email } = req.body;

        let user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        };

        if(firstname) user.firstname = firstname;
        if(lastname) user.lastname = lastname;
        if(username) user.username = username;
        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }
        if(email) user.email = email;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    }catch (error) {
        console.error('Error updating User by id', error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if(!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user })
    }catch (error) {
        console.error('Error deleting User by id');
        res.status(500).json({ message: 'Internal Server Error' });
    }
};