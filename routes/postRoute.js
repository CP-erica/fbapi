const express = require('express');
const Post = require('../models/post');
const upload = require('./uploadImage')
const auth = require('../middleware/auth');
const router = new express.Router();




//for post add 
router.post('/addpost', (req, res) => {
    var newPost = new Post(req.body);
    newPost.save().then(function () {
        res.send('Post uploaded');
    }).catch(function (e) {
        res.send(e);
    });
});

//for getting post
router.get('/showpost', (req, res) => {
    Post.find().then(function (post) {
        res.send(post);
    }).catch(function (er) {
        res.send(er);
    });
});

router.get('/showpostById', (req, res) => {
    Post.findById(req.params._id).then(function (postById) {
        res.send(postById);
    }).catch(function (er) {
        res.send(er);
    });
});

module.exports = router;