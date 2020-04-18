const fs = require('fs');
const jwt = require('jsonwebtoken');

// TODO Create admin schema
// TODO Retrive password from db and check

exports.newLogin = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        res.status(401).render('error', { message: 'Invalid login/password' });
    }

    const privateKey = JSON.parse(fs.readFileSync(__dirname + '/../db/privateKey.json', 'utf8')).privateKey;
    const adminToken = jwt.sign({ login }, privateKey, { algorithm: 'HS256' });

    res.cookie('adminToken', adminToken);
    next();
}

exports.checkLogin = (req, res, next) => {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
        res.status(401).render('error', { message: 'Invalid login/password' });
    }

    try {
        const privateKey = JSON.parse(fs.readFileSync(__dirname + '/../db/privateKey.json', 'utf8')).privateKey;
        jwt.verify(adminToken, privateKey);
    } catch (error) {
        res.status(401).render('error', { message: 'Invalid login/password' });
    }

    next();
}