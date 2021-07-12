const { Sequelize, DataTypes } = require("sequelize");

const connexion = require("./connexion");

const Post = connexion.define(
    "post",
    {
        message:{
            type:DataTypes.TEXT
        },
        image:{
            type:DataTypes.STRING
        }
    }
);

module.exports = Post;