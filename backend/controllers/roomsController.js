const room = require('../models/room');

exports.index = async (req, res, next) => {
    const roomsList = await room.find();
    res.send({ roomsList });
}

exports.roomsLogin = async (req, res, next) => {
    const username = req.body.username;
    const avatarUrl = req.body.avatarUrl;

    const roomsList = await room.find();

    res
        .cookie('username', username, { httpOnly: true, signed: true })
        .cookie('avatar', avatarUrl, { httpOnly: true, signed: true });

    res.send({ roomsList });
}

exports.index_old = async (req, res, next) => {
    const roomsList = await room.find();
    res.render('rooms',
        {
            title: 'Rooms',
            username: req.cookies.username,
            avatar: req.cookies.avatar,
            roomsList: roomsList
        });
}

exports.roomsLogin_old = async (req, res, next) => {
    const username = req.body.username;

    if (!username) {
        res.status(401).render('error', { message: 'Invalid username' });
    }

    const avatar = `https://avatars.dicebear.com/v2/gridy/${username}.svg?options[width][]=500&options[height][]=500`;

    res.cookie('username', username);
    res.cookie('avatar', avatar);

    const roomsList = await room.find();
    res.render('rooms',
        {
            title: 'Rooms',
            username: username,
            avatar: avatar,
            roomsList: roomsList
        });
}