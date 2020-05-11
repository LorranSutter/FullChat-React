const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const room = require('../models/room');
const adminModel = require('../models/admin');
const HistoryChat = require('../models/HistoryChat');
const HistorySocket = require('../models/HistorySocket');
const { privateKey } = require('../db/privateKey');

exports.index = async (req, res, next) => {
    const roomList = await room.find();
    const historyList = await HistoryChat
        .find()
        .populate('room')
        .sort({ 'date': -1 });

    let userList = historyList.map(x => x.user);
    userList = [...new Set(userList)].sort()

    res.send({ roomList, userList, historyList })
}

exports.newLogin = async (req, res, next) => {

    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const admin = await adminModel.findOne({ login });
    if (!admin) {
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const adminToken = jwt.sign({ login }, privateKey, { algorithm: 'HS256' });

    res.status(200).send({ adminToken });
}

exports.partialHistory = async (req, res, next) => {

    let { page = 0 } = req.query;
    let skip = page < 0 ? 0 : page * 10;

    const countHistoryList = await HistoryChat
        .find({
            $and: [
                req.query.user ? { "user": req.query.user } : {},
                req.query.roomId ? { "room": req.query.roomId } : {}
            ]
        })
        .countDocuments();

    if (countHistoryList < 10) {
        skip = 0
    } else if (countHistoryList <= skip) {
        skip = countHistoryList - 10;
    }

    const historyList = await HistoryChat
        .find({
            $and: [
                req.query.user ? { "user": req.query.user } : {},
                req.query.roomId ? { "room": req.query.roomId } : {}
            ]
        })
        .skip(skip)
        .limit(10)
        .populate('room')
        .sort({ 'date': -1 });

    res.status(200).send({ countHistoryList, historyList });
}


exports.socketEvents = async (req, res, next) => {

    let { page = 0 } = req.query;
    let skip = page < 0 ? 0 : page * 10;

    const countHistoryList = await HistorySocket
        .find()
        .countDocuments();

    if (countHistoryList < 10) {
        skip = 0
    } else if (countHistoryList <= skip) {
        skip = countHistoryList - 10;
    }

    const historyList = await HistorySocket
        .find()
        .skip(skip)
        .limit(10)
        .populate('room')
        .sort({ 'date': -1 });

    res.status(200).send({ countHistoryList, historyList });
}