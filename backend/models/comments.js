const { Sequelize, DataTypes } = require("sequelize");

const connexion = require("./connexion");

const Comment = connexion.define(
    "comment",
    {
        message:{
            type:DataTypes.TEXT
        }
    }
);

module.exports = Comment;