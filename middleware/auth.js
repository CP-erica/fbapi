const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'mynewtoken');
        // it is findOne nt findaOne -_-
        const user = await User.findOne({
            _id: decoded._id, 'tokens.token': token
        });

        console.log('ssds',user,'dds')
        if (!user._id) {
            throw new Error();
        }
    //    if (user.tokens.token !== token) 
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate!!' });
    }
}

module.exports = auth;
