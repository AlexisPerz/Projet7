const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('../models/posts');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include:{
            all:true,
            nested:true
        },
        order: [
            ["createdAt", "DESC"]
        ]
    })
    .then((posts) => 
        res.status(200).json(posts))
    .catch(error => 
        res.status(400).json({ error })
    );
};

exports.createPosts = (req, res, next) => {
    let postsObject = {message : req.body.message};
    if (req.file != undefined){
        postsObject.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    postsObject.userId = req.token.userId;
    Post.create(postsObject)
    .then(() => 
        res.status(201).json({ message: 'Publication réussi !'}))
    .catch(error =>
        res.status(400).json({ error })
    );
};

exports.getOnePosts = (req, res, next) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        include:{
            all:true,
            nested:true
        }
    }).then((posts) => 
        res.status(200).json(posts))
    .catch(error => 
        res.status(404).json({ error })
    );
};

exports.modifyPosts = (req, res, next) => {
    Post.findOne({
        where:{
            id: req.params.id
            }
        })
            .then((posts) => {
                if(posts.userId == req.token.userId || req.token.isAdmin){
                    posts = Object.assign(posts, req.body.posts)
                    posts.save();
                    res.status(200).json({ message: 'Publication modifié !' })
                }else{
                    res.status(403)
                }
            })
            .catch(error => 
                res.status(400).json({ error }));
};

exports.deletePosts = (req, res, next) => {
    Post.findOne({
        where:{
            id: req.params.id
            }
        })
            .then((posts) => {
                if(posts.userId == req.token.userId || req.token.isAdmin){
                    posts.destroy();
                    res.status(200).json({ message: 'Publication supprimé !' })
                }else{
                    res.status(403).json({ message : "Vous n'avez pas les droits"})
                }
            })
            .catch(error => 
                res.status(400).json({ error }));
};