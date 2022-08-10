const mongoose = require('mongoose')
const Market = require('../models/market.js')
const User = require('../models/user.js')

exports.createMarket = async (req, res) => {
    try{
        const newMarket = await Market.create({
            name: req.body.name
        })

        res.status(201).json({
            status: 'success',
            data: newMarket,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to create market...'
        })
    }
}

exports.findAllMarkets = async (req, res) => {
    try {
        const allMarkets = await Market.find().populate('membersList')

        res.status(200).json({
            status: 'success',
            data: allMarkets,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find all markets...'
        })
    }
}

exports.findMarket = async (req, res) => {
    try {
        const foundMarket = await Market.findById(req.params.id).populate('membersList')

        res.status(200).json({
            status: 'success',
            data: foundMarket,
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'failed',
            message: 'failed to find that market...'
        })
    }
}

// GENERAL UPDATE

exports.updateMarket = async (req, res) => {
    try {
        const updatedMarket = await Market.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: 'success',
            data: updatedMarket,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to update market...'
        })
    }
}

// ADD MEMBER TO MEMBERLIST...

exports.addMarketMemberList = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.user._id)
        if (userToUpdate.markets.length < 5 && !userToUpdate.markets.includes(req.params.id)) {
            userToUpdate.markets.push(req.params.id)
            await userToUpdate.save()
            const marketToUpdate = await Market.findByIdAndUpdate(req.params.id, {$push: { membersList: req.user._id}}, { new: true}).populate('membersList')
            
            res.status(200).json({
                status: 'success',
                data: marketToUpdate,
            })
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'too many markets or market is already covered...'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to add member...'
        })
    }
}

// REMOVE MEMBER FROM MEMBERLIST...

exports.removeMarketMemberList = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.user._id)
        const marketToUpdate = await Market.findById(req.params.id)

        if (userToUpdate.markets.includes(req.params.id) && marketToUpdate.membersList.includes(req.user._id)) {
            userToUpdate.markets = userToUpdate.markets.filter(el => el.toString() != req.params.id)
            await userToUpdate.save()
            marketToUpdate.membersList = marketToUpdate.membersList.filter(el => el.toString() != req.user._id)
            const updatedMarketMemberList = await marketToUpdate.save()

            res.status(200).json({
                status: 'success',
                data: updatedMarketMemberList
            })
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'conditions not met...'
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to remove member...'
        })
    }
}

exports.deleteMarket = async (req, res) => {
    try {
        await Market.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            data: 'successfully deleted market...'
        })
    } catch {err} {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'failed to delete that market...'
        })
    }
}