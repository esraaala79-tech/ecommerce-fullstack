const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema} = require('../Controllers/Validation/authValidation.js');
const registerController = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false,  
            stripUnknown: true  // removes the additional fields in the body that not defined in the schema
        });

        if (error) {
            return res.status(400).json({ 
               
                msg: error.details.map((err) => err.message)
            });
        }

        const { username, email, password, role } = value;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
            /*
                Outer object: { $or: [...] }
                    $or is a MongoDB logical operator
                    It means: match documents that satisfy AT LEAST ONE of the conditions in the array
                    Returns true if any of the conditions are true
            */
        });

        if (existingUser) {
            return res.status(409).json({   
        
                msg: existingUser.email === email
                    ? "Email already registered"
                    : "Username already taken"
            });
        }

    
        const salt = await bcrypt.genSalt(10); 
        // A salt is a random string of characters that gets added to a password before hashing
        //The cost factor (e.g., 10) controls hashing strength by setting rounds as 
        //2^cost, where higher values increase security but slow performance. "$2b$10$N9qo8uLOickgx2ZMRZoMyM"
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const user = new User({ 
            username,                                 
            email,                                              
            password: hashedPassword,                       
            role: role || 'user' 
        });  

        await user.save(); 

        const token = jwt.sign( 
            { userId: user._id, email: user.email, role: user.role }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: '7d' } 
        );

        const userResponse = user.toObject();

        delete userResponse.password; 
        return res.status(201).json({ 
            msg: "User registered successfully",
            token,
            user: userResponse
        });

    } catch (error) { 
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        const { email, password } = value;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            msg: "Login successful",
            token,
            user: userResponse
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};


module.exports = { registerController, loginController };