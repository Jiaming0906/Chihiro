const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const NewBetUsers = sequelize.define("NewBetUsers", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
    },
    games: {
        type: DataTypes.STRING,
        defaultValue: "00000000000000000000",
    },
}, {
    //model options here
    timestamps: false,
});

module.exports = NewBetUsers;

// 