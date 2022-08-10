const mongoose = require('mongoose')

 const walletSchema = new mongoose.Schema({
    wallet: {
        type: String, 
        required: true,
    },
    link: {
        type: String, 
        required: true
    },
    eth: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now().toString()
    }
}, {timestamps: true})

module.exports = walletSchema;