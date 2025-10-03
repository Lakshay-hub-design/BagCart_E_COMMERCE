const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function register (req, res){
    const { username, email, password} = req.body

    try{
        if(!username || !email || !password) return res.status(400).json({message: "Plese provide all fields"});
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email address."})
        if(password.length < 6) return res.status(400).json({ message: "Password must be at least 6 charcters." })

        const exist = await userModel.findOne({email})
        if(exist) return res.status(400).json({message: "User already  exist"});

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "User registered succesfully",
            user:{
                _id : user._id,
                email: user.email,
                username: user.username
            }
        })
    }catch (error){
        console.error(error)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

async function login (req, res){
    const {email, password} = req.body

    try{
        if(!email && !password) return res.status(400).json({message: "Plese provide all fields"})
        
        const user = await userModel.findOne({email})

        if(!user) return res.status(400).json({ message: "Invalid email or password. Please try again."})
        
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) return res.status(400).json({ message: "Invalid email or password. Please try again."})

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        let redirectUrl = "/shop";
        if (user.role === "admin") redirectUrl = "/admin/dashboard";

        res.status(200).json({ 
            message: "User login successfull",
            redirect: redirectUrl,
            user:{
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

function logOut (req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out"
    })
}

// async function createAdmin(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     const existing = await userModel.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = new userModel({
//       username,
//       email,
//       password: hashedPassword,
//       role: "admin"
//     });

//     await admin.save();

//     res.status(201).json({ message: "Admin account created", admin });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// }


module.exports = {
    register,
    login,
    logOut,
    // createAdmin
}