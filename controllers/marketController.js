const mongoose = require('mongoose')
const Market = require('../models/market.js')

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
        const allMarkets = await Market.find()

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
        const foundMarket = await Market.findById(req.params.id)

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