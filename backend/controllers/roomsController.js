const room = require('../models/room');

exports.index = async (req, res, next) => {
    const roomsList = await room.find();
    res.send({ roomsList });
}