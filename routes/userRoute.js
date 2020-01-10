const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

//for signup to insert data 
router.post('/signup', (req, res) => {
    var newUser = new User(req.body);
    newUser.save().then(function () {
        res.send('New Account Registered');
    }).catch(function (e) {
        res.send(e);
    });
});

//data select from database
router.get('/users', (req, res) => {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (er) {
        res.send(er);
    });
});

//for login
router.post('/login', async (req, res) => {
    try {
        const user = await User.checkCrediantialsDb(req.body.email_phone, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }

});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { return token.token !== req.token })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// for loggin out from all device at once 
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router;
