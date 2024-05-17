const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const BotChannels = sequelize.define("BotChannels", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    channelId: {
        type: DataTypes.STRING,
        defaultValue: "1072676212985569361",
    },
}, {
    //model options here
    timestamps: false,
});

module.exports = BotChannels;

//