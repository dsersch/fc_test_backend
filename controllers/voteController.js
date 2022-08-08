const mongoose = require('mongoose')
const Vote = require('../models/vote.js')

exports.createVote = async (req, res) => {
    try {
        const newVote = await Vote.create({
            startup: req.body.startup,
            votingMember: req.user._id,
            score: req.body.score,
            comment: req.body.comment,
        })

        res.status(201).json({
            status: 'success',
            data: newVote,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "failed to create vote..."
        })
    }
}

exports.findAllVotes = async (req, res) => {
    try {
        const allVotes = await Vote.find()

        res.status(200).json({
            status: 'success',
            data: allVotes
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find votes...'
        })
    }
}

exports.findVote = async (req, res) => {
    try {
        const foundVote = await Vote.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: foundVote,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find vote...'
        })
    }
}

exports.updateVote = async (req, res) => {
    try {
        const updatedVote = await Vote.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: 'success',
            data: updatedVote
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to update vote...'
        })
    }
}

exports.deleteVote = async (req, res) => {
    try {
        await Vote.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            message: 'successfuly deleted vote...'
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to delete that vote...'
        })
    }
}