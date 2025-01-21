const User = require("../../../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const {email,password} = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Send a response
        res.status(201).json({ message: "User registered successfully",user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = registerUser;