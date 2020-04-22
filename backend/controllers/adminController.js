const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const room = require('../models/room');
const adminModel = require('../models/admin');
const HistoryChat = require('../models/HistoryChat');
const HistorySocket = require('../models/HistorySocket');

exports.index = async (req, res, next) => {
    console.log('index admin cookies');
    console.log(req.cookies);
    console.log(req.headers);
    const roomList = await room.find();
    const historyList = await HistoryChat
        .find()
        .populate('room')
        .sort({ 'date': -1 });

    let userList = historyList.map(x => x.user);
    userList = [...new Set(userList)].sort()

    res.send({ roomList, userList, historyList })

    // res.render('admin',
    //     {
    //         title: 'Admin',
    //         roomList: roomList,
    //         userList: userList,
    //         historyList: historyList
    //     }
    // );
}

exports.newLogin = async (req, res, next) => {

    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        // res.status(401).render('error', { message: 'Invalid login/password' });
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const admin = await adminModel.findOne({ login });
    if (!admin) {
        // res.status(401).render('error', { message: 'Invalid login/password' });
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        // res.status(401).render('error', { message: 'Invalid login/password' });
        res.status(401).send({ message: 'Invalid login/password' });
    }

    const privateKey = JSON.parse(fs.readFileSync(__dirname + '/../db/privateKey.json', 'utf8')).privateKey;
    const adminToken = jwt.sign({ login }, privateKey, { algorithm: 'HS256' });

    res.status(200).send({ adminToken });
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