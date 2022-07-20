const mongoose = require('mongoose')
const User = require('../models/user.js')

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            company: req.body.company,
            userType: req.body.userType,
            skills: req.body.skills,
            markets: req.body.markets,
        })

        res.status(201).json({
            status: "success",
            data: newUser,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "failed to create user..."
        })
    }
}

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
        const foundUser = await User.findById(req.params.id)

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

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

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