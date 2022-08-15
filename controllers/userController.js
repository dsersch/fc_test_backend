const mongoose = require('mongoose')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Authentication

exports.registerNewUser = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            company: req.body.company,
            userType: req.body.userType,
            skills: req.body.skills,
            markets: req.body.markets,
        })

        const token = newUser.getSignedToken()

        res.status(201).json({
            status: "success",
            data: newUser,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "failed to create user..."
        })
    }
}

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 'failed',
            message: 'Please provide an email and a password...',
        })
    }

    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');

        if (!user || !(await user.matchPassword(req.body.password))) {
            return res.status(400).json({
                status: 'failed',
                message: 'Incorrect Email or Password...'
            })
        }

        const token = user.getSignedToken()

        res.status(200).json({
            status: 'success',
            user: {
                ...user,
                token,
            },
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: 'Failed to find that user...',
        })
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token
    
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
    
        if (!token) {
            return res.status(401).json({
                status: 'failed',
                message: 'failed to find token...'
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            return res.status(401).json({
                status: 'failed',
                message: 'failed to verify token...'
            })
        }
    
        const loggedInUser = await User.findById(decodedToken.id)

        if (!loggedInUser) {
            return res.status(401).json({
                status: 'failed',
                message: 'User no longer exists...'
            })
        }

        req.user = loggedInUser
    
        next()
    } catch (error) {
        res.status(401).json({
            status: 'failed',
            message: 'not authorized...'
        })
    }
}

// CRUD 

exports.findAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        res.status(200).json({
            status: 'success',
            data: allUsers,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find users...'
        })
    }
}

exports.findUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user._id)

        res.status(200).json({
            status: 'success',
            data: foundUser,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find that user...'
        })
    }
}

// Find User by Market

exports.findUsersByMarket = async (req, res) => {
    try {
        const usersByMarket = await User.find({markets: { $in: [req.params.id] }}).populate('markets')

        res.status(200).json({
            status: 'success',
            data: usersByMarket,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'Failed to find users...'
        })
    }
}

exports.generatePod = async (marketId) => {
    try {
        const podMembers = await User.find({ markets: { $in: [marketId]}}).select('_id')
        let memberArray = []
        podMembers.forEach(el => memberArray.push(el._id))
        return memberArray
    } catch (err) {
        console.log(err)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})

        res.status(200).json({
            status: 'success',
            data: updatedUser,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to update that user...'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            message: 'successfuly deleted user...'
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to delete that user...'
        })
    }
}