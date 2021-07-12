const { Sequelize, DataTypes } = require("sequelize");

const connexion = require("./connexion");

const User = connexion.define(
    "user",
    {
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:0
        }
    }
);

module.exports = User;