const async = require('async');
const moment = require('moment');

const room = require('./models/room');
const HistoryChat = require('./models/HistoryChat');
const HistorySocket = require('./models/HistorySocket');

const InitiateMongoServer = require("./db/config");
const mongoose = require('mongoose');

// Initiate Mongo Server
InitiateMongoServer();

const numOfMsg = 50;
const numOfSocketEvents = 20;
let rooms = [];
let historiesChat = [];
let historiesSocket = [];

const roomsList = [
    'Batcave',
    'Westworld',
    'Jötunheim',
    'Death Star',
    'Kings Landing',
    'Hall of Justice',
    'Mos Eisley Cantina',
    'Spider Skull Island',
    'Thunderdome'
];

const usersList = [
    'ticklishgoose483',
    'goldenelephant339',
    'beautifulwolf535',
    'yellowlion153',
    'ticklishtiger397',
    'browncat513',
    'redwolf845',
    'sadbear185',
    'organicbird759',
    'sadbutterfly300'
];

const msgList = [
    "Chuck Norris is responsible for the dark matter of the universe. It is made up of the atoms of everything he's killed or destroyed.",
    "Chuck Norris walked past Uasin Bolt who was running the 100m... on the day that he broke the world record",
    "Why do so many rock stars die at age 27? Chuck Norris",
    "david copper field can turn a $1 bill into $100. but Chuck Norris can turn david copperfield into the u.s. tresury",
    "Chuck Norris combs his hair with a pitchfork.",
    "If you see Chuck Norris fighting a bear, don't help Chuck Norris, help the bear.",
    "Chuck Norris doesn't use web standards as the web will conform to him.",
    "All who would win joy, must share it; happiness was born a twin.",
    "You have to sniff out joy; keep your nose to the joy-trail.",
    "So shall I join the choir invisible Whose music is the gladness of the world.",
    "That seems to be the way of things. Everyone takes, everyone gives. Life is like that.",
    "But when one masters this wretched desire, which is so hard to overcome, then one's sorrows just drop off, like a drop of water off a lotus.",
    "A big man is one who makes us feel bigger when we are with him.",
    "I see the first lady as another means to keep a president from becoming isolated.",
    "Art comes to you proposing frankly to give nothing but the highest quality to your moments as they pass.",
    "Democracy encourages the majority to decide things about which the majority is blissfully ignorant.",
    "Everything in life is somewhere else, and you get there in a car.",
    "A man's true state of power and riches is to be in himself.",
    "For he seemed to me again like a king, Like a king in exile, uncrowned in the underworld, Now due to be crowned again.",
    "You will not find poetry anywhere unless you bring some of it with you.",
    "The most certain test by which we judge whether a country is really free is the amount of security enjoyed by minorities.",
    "All coaching is, is taking a player where he can't take himself.",
    "My efforts with Hollywood are like things written in water.",
    "Morning glory is the best name, it always refreshes me to see it."
];

function getRandomRoomObj() {
    return rooms[parseInt(Math.random() * rooms.length)];
}

function getRandomUser() {
    return usersList[parseInt(Math.random() * usersList.length)];
}

function getRandomMsg() {
    return msgList[parseInt(Math.random() * msgList.length)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomInt(start, end) {
    return parseInt(Math.random() * (end + 1 - start) + start)
}

function roomCreate(name, cb) {
    let newRoom = new room({ name });

    newRoom.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New Room: ' + newRoom.name);
        rooms.push(newRoom);
        cb(null, newRoom);
    });
}

function historyChatCreate(user, room, message, date, cb) {
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
        historiesChat.push(newHistoryChat);
        cb(null, newHistoryChat);
    });
}

function historySocketCreate(user, room, event, date, cb) {
    let newHistorySocket = new HistorySocket(
        {
            user,
            room,
            event,
            date
        }
    );

    newHistorySocket.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New history socket: ' + newHistorySocket.event);
        historiesSocket.push(newHistorySocket);
        cb(null, newHistorySocket);
    });
}

function populateRooms(cb) {
    let roomsCreateArray = []
    for (const room of roomsList) {
        roomsCreateArray.push(cb => roomCreate(room, cb));
    }

    async.series(roomsCreateArray, cb);
}

function populateHistoryChat(cb) {
    let historyChatCreateArray = []
    for (let i = 0; i < numOfMsg; i++) {
        historyChatCreateArray
            .push(cb => historyChatCreate(getRandomUser(), getRandomRoomObj(), getRandomMsg(), randomDate(new Date(2020, 1, 30), new Date(2020, 2, 6)), cb));
    }

    async.parallel(historyChatCreateArray, cb);
}

function populateHistorySocket(cb) {
    let historySocketCreateArray = []
    for (let i = 0; i < numOfSocketEvents; i++) {

        let user = getRandomUser();
        let room = getRandomRoomObj();
        let dateConnect = randomDate(new Date(2020, 1, 30), new Date(2020, 2, 6));
        let dateJoin = moment(dateConnect).add(randomInt(1, 30).toString(), 'm').toDate();
        let dateLeft = moment(dateJoin).add(randomInt(1, 30).toString(), 'm').toDate();
        let dateDisconnect = moment(dateLeft).add(randomInt(1, 30).toString(), 'm').toDate();

        historySocketCreateArray.push(cb => historySocketCreate(user, null, "new socket connection", dateConnect, cb));
        historySocketCreateArray.push(cb => historySocketCreate(user, null, "socket disconnection", dateDisconnect, cb));
        historySocketCreateArray.push(cb => historySocketCreate(user, room, "joined the room", dateJoin, cb));
        historySocketCreateArray.push(cb => historySocketCreate(user, room, "has left the room", dateLeft, cb));
    }

    async.parallel(historySocketCreateArray, cb);
}

async.series([
    populateRooms,
    populateHistoryChat,
    populateHistorySocket
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Rooms Instances: ' + rooms.length);
            console.log('History Chat Instances: ' + historiesChat.length);
            console.log('History Socket Instances: ' + historiesSocket.length);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);