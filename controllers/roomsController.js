const room = require('../models/room');

exports.index = async (req, res, next) => {
    const roomsList = await room.find();
    res.render('rooms',
        {
            title: 'Rooms',
            username: req.cookies.username,
            avatar: req.cookies.avatar,
            roomsList: roomsList
        });
}

exports.roomsLogin = async (req, res, next) => {
    const username = req.body.username;
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