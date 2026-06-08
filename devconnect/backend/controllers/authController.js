require('dotenv').config()
const Users = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        let { userName, name, email, password } = req.body

        if (!userName || !name || !email || !password) {
            return res.status(400).json({
                message: "All Feild Required For Registeration"
            })
        }
//Password validation
        const hasUpper = /[A-Z]/.test(password)
        const hasLower = /[a-z]/.test(password)
        const hasNumber = /\d/.test(password)
        if ((password.length < 8) || (!hasNumber || !hasUpper || !hasLower) ) {
            return res.status(400).json({
                message: "Password must include uppercase,lowercase and number with atleast 8 characters!"
            })
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid Email Format..'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new Users({
            userName: userName,
            name: name,
            email: email,
            password: hashPassword
        })
        await user.save()
        res.status(201).json({
            message: "New User Registered"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        let { userName, password } = req.body

        if (!userName || !password) {
            return res.status(400).json({
                message: 'Required all field'
            })
        }

        const userLogin = await Users.findOne({
            userName: userName
        })
        if (!userLogin) {
            res.status(401).json({
                message: 'Invalid Credentials'
            }
            )
            return
        }

        const isMatch = await bcrypt.compare(password, userLogin.password)
        if (!isMatch) {
            res.status(401).json({
                message: 'Password Invalid'
            })
            return
        }
        const token = jwt.sign(
                { userId: userLogin._id },
                process.env.JWT_KEY,
                { expiresIn: '7d' }
            )
            res.json({ token })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

module.exports = { register, login }