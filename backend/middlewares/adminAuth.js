const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/admin');

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

    console.log(adminToken);

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