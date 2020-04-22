const mongoose = require('mongoose')

const historySocketSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => { return new Date() },
        required: true
    }
});

module.exports = mongoose.model('HistorySocket', historySocketSchema);
