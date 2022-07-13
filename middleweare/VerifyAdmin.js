const User = require ('../models/user')


async function verifyAdmin(req, res, next) {
    const {token} = req.body;
    // console.log('REQ PUNTO BARI',req.body)
    const user = await User.findOne({token});
    const found = user.roles.find(e => e == '')


    // console.log('TOKEN DB => ', user.token)
    found ? next() : res.sendStatus(401)
}

module.exports = {verifyAdmin};