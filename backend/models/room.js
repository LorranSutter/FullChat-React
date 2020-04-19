const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('room', roomSchema);
