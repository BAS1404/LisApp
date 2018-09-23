var express = require('express');
var config = require('../../config');
var verify = require('../../libs/verify');
var router = express.Router();
var Post = require('../../schemas/PostSchema');

router.get('/post', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            Post.find({}, function(err, post) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    res.status(200).json(post)

        })
    }
})});

router.get('/post/:id', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.postID) {
                Post.findOne({
                    _id: req.body.postID
                }, function(err, post) {
                    if (err)
                        res.status(404).json({error: "not found"});
                    else
                        res.status(200).json(post)
                })
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.post('/post', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.postID) {
                var post = new Post({PostName: req.body.postName});
                post.save(function(err, newPost) {
                    if (err)
                        res.status(500).json({error: "Error add post"});
                    else
                        res.status(200).json(newPost);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});
router.put('/post', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.postID) {
                Post.findByIdAndUpdate(req.body.postID, {
                    $set: {
                        PostName: req.body.postName
                    }
                }, {
                    new: true
                }, function(err, post) {
                    if (err)
                        res.status(500).json({error: "Error update post"})
                    else
                        res.status(200).json(post);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.delete('/post', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.postID) {
                Post.deleteOne({
                    _id: req.body.postID
                }, function(err, result) {
                    if (err)
                        res.status(500).json({error: "Error delete post"});
                    else
                        res.status(200),
                        json(result);
                    }
                );
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});
module.exports = router;
