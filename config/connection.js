// const { Sequelize } = require('sequelize');
// require('dotenv').config();


// const sequelize = new Sequelize(
//   process.env.DB,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }
// );


// module.exports = sequelize;

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// when deployed on Heroku
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // localhost
    sequelize = new Sequelize(process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;