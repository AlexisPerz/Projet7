const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Comment = require('../models/comments');

/**
 * Permet de creer un nouveau commentaire associer a un post 
 * @param {Request} req Requete recu par le serveur
 * @param {Response} res 
 * @param {function} next 
 */
exports.createComments = (req, res, next) => {
    let commentsObject = (req.body.comments);
    delete commentsObject._id;
    if (req.file != undefined){
        commentsObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const comments = new Comment({
        userId: req.token.userId,
        ...commentsObject
    });
    comments.save()
    .then(() => 
        res.status(201).json({ message: 'Commentaire publié !'}))
    .catch(error =>
        res.status(400).json({ error })
    );
};

exports.modifyComments = (req, res, next) => {
    Comment.findOne({
        where:{
            id: req.params.id
            }
        })
            .then((comments) => {
                if(comments.userId == req.token.userId || req.token.isAdmin){
                    comments = Object.assign(comments, req.body.comments)
                    comments.save();
                    res.status(200).json({ message: 'Commentaire modifié !' })
                }else{
                    res.status(403)
                }
            })
            .catch(error => 
                res.status(400).json({ error }));
};

exports.deleteComments = (req, res, next) => {
    Comment.findOne({
        where:{
            id: req.params.id
            }
        })
            .then((comments) => {
                if(comments.userId == req.token.userId || req.token.isAdmin){
                    comments.destroy();
                    res.status(200).json({ message: 'Commentaire supprimé !' })
                }else{
                    res.status(403).json({ message: "Vous n'avez pas les droit !" })
                }
            })
            .catch(error => 
                res.status(400).json({ error }));
};