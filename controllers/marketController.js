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