var jwt = require('jsonwebtoken')
var { BadRequestError } = require('../errors/')
var bcrypt = require('bcryptjs')
var users = require('../models/users')

async function signup(req, res) {
    var { name, email, password: plainTextPassword } = req.body
    if (!name || typeof name !== 'string')
        return res.json({
            status: 'error', error: 'Invalid Username'
        })
    if (!plainTextPassword || typeof plainTextPassword !== 'string')
        return res.json({
            status: 'error', error: 'Invalid Password'
        })

    if (plainTextPassword.length < 8)
        return res.json({
            status: 'error', error: 'Password too small, should atleast be 8 characters'
        })
    var salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(plainTextPassword, salt)
    console.log("password", password)
    try {
        var userCreated = await users.create({
            name, email, password
        })
        console.log(password, plainTextPassword)

        var token = jwt.sign(
            {
                id: userCreated._id,
                email: userCreated.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )
        console.log("token", token)
        res.status(200).json({
            'status': 'ok',
            success:1,
            data: token
        })
        console.log("User data enteered successfully")
    } catch (err) {
        if (err.code === 11000) {
            return res.json({
                status: 'error',
                error: "E-mail address already exist"
            })
        }
        return res.json({
            status: 'error',
            error: "Someting went Wrong"
        })
    }
}
async function homePage(req,res) {
    res.send("HELLO")
}
async function login(req, res) {
    console.log(req.body)
    try {
        var { email, password } = req.body
        var userlogin = await users.findOne({ email }).lean()
        console.log(userlogin)
        if (!userlogin)
            return res.json({
                "status": "error",
                error: "Invalid Email or Password"
            })
        if (await bcrypt.compare(password, userlogin.password)) {
            console.log("Yes")
            var token = jwt.sign({
                id: userlogin._id,
                email: userlogin.email
            },
                process.env.JWT_SECRET,
                { expiresIn: '2d' })
            console.log("password matched")
            res.status(200).json({
                'status': 'ok',
                'success': 1,
                'token': token
            })
        }
        else {
            return res.json({
                "status": "error",
                error: "Invalid Email or Password"
            })
        }
    } catch (err) {
        res.json({
            "status": "error",
            error: err.message
        })
    }
}
module.exports = { login, homePage, signup }
