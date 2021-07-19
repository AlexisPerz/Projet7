const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({where:{ email: req.body.email }})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              isAdmin: user.isAdmin,
              userId: user.id,
              token: jwt.sign(
                { userId: user.id, isAdmin: user.isAdmin },
                '88a820b06fbd2ac07d17771ac180c60f',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.delete = (req, res, next) => {
  User.findOne({
    where : {
      id : req.token.userId
    }
  })
  .then((user) => {
    user.destroy();
    res.status(200).json({ message: 'Profil supprimé !' })
  })
  .catch(error => 
    res.status(400).json({ error }));
}