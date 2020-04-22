const room = require('../models/room');
const HistoryChat = require('../models/HistoryChat');
const HistorySocket = require('../models/HistorySocket');

function roomCreate(name) {
    let newRoom = new room({ name });

    newRoom.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New Room: ' + newRoom.name);
    });
}

function historyChatCreate(user, room, message, date) {
    let newHistoryChat = new HistoryChat(
        {
            user,
            room,
            message,
            date
        }
    );

    newHistoryChat.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New history chat: ' + newHistoryChat.message);
    });
}

function historySocketCreate(user, room, message, date) {
    let newHistorySocket = new HistorySocket(
        {
            user,
            room,
            message,
            date
        }
    );

    newHistorySocket.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New history socket: ' + newHistorySocket.event);
    });
}

module.exports = {
    roomCreate,
    historyChatCreate,
    historySocketCreate
}