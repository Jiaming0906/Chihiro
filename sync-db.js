// initialize the database
// const sequelize = require("./database.js");

// sequelize.sync({ force: true });

// const BotChannels = require("./models/bot-channels.js");
// //one dot to represent the same directory as sync-db.js

// BotChannels.sync({ force: true });

//

const BetUsers = require("./models/bet-users.js");
//one dot to represent the same directory as sync-db.js

BetUsers.sync({ force: true });