const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true, 
    },
   

}, {timestamps: true});

mongoose.exports =  peopleSchema;