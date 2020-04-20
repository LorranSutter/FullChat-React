// const Cookies = require('universal-cookie')

module.exports = (req, res, next) => {
    // const cookies = new Cookies(req.headers.cookie);
    console.log('here cookies');
    console.log(req.cookies);
    console.log(req.signedCookies);
    // console.log(req.universalCookies );
    console.log(req.headers );
    // console.log(res.headers );
    // console.log(cookies.get('username'));
    // console.log(cookies);
    // if (!(req.cookies.username) || !(req.cookies.avatar)) {
    //     res.redirect('/');
    // }
    next();
};