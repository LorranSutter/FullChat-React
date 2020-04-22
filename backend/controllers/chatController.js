const mongoose = require('mongoose');

const room = require('../models/room');
const HistoryChat = require('../models/HistoryChat');

exports.index = async (req, res, next) => {
    const chatRoom = await room.findById(req.params.roomId);
    const msgList = await HistoryChat.find(
        { room: mongoose.Types.ObjectId(req.params.roomId) },
        { _id: -1, user: 1, room: -1, message: 1, date: 1 }
    ).sort({ 'date': 1 });

    res.send({ chatRoom, msgList });
}