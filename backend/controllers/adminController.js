const room = require('../models/room');
const HistoryChat = require('../models/HistoryChat');
const HistorySocket = require('../models/HistorySocket');

exports.index = async (req, res, next) => {
    const roomList = await room.find();
    const historyList = await HistoryChat
        .find()
        .populate('room')
        .sort({ 'date': -1 });

    let userList = historyList.map(x => x.user);
    userList = [...new Set(userList)].sort()
    const cookies = req.cookies;

    res.send({ cookies, roomList, userList, historyList });

    // res.render('admin',
    //     {
    //         title: 'Admin',
    //         roomList: roomList,
    //         userList: userList,
    //         historyList: historyList
    //     }
    // );
}

exports.partialHistory = async (req, res, next) => {
    const historyList = await HistoryChat
        .find({
            $and: [
                req.query.user ? { "user": req.query.user } : {},
                req.query.roomId ? { "room": req.query.roomId } : {}
            ]
        })
        .populate('room')
        .sort({ 'date': -1 });

    res.render('historyPartial',
        {
            title: 'History Partial',
            historyList: historyList
        }
    );
}


exports.socketEvents = async (req, res, next) => {
    const historyList = await HistorySocket
        .find()
        .populate('room')
        .sort({ 'date': -1 });

    res.render('socketEvents',
        {
            title: 'Queries',
            historyList: historyList
        }
    );
}