const { Sequelize } = require("sequelize");
const connexion = new Sequelize('groupomania', 'root', '56/LeXou', {
  host: 'localhost',
  dialect: 'mysql'
});

connexion.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.error('Unable to connect to the database:', error))

module.exports = connexion;