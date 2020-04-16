const mongoose = require('mongoose')

const historyChatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: true
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

module.exports = mongoose.model('HistoryChat', historyChatSchema);
