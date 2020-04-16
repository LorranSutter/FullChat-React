module.exports = (req, res, next) => {
    if (!(req.cookies.username) || !(req.cookies.avatar)) {
        res.redirect('/');
    }
    next();
};