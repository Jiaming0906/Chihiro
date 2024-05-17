//npm install sequelize sqlite3
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
    dialect: "sqlite",
    host: "localhost",

    storage: "database.sqlite",
    logging: false,
});

module.exports = sequelize;