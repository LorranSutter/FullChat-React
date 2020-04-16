exports.index = (req, res, next) => {
    res.render('index', { title: 'Full Chat' });
}