exports.index = (req, res, next) => {
    res.render('adminLogin', { title: 'Admin Login' });
}