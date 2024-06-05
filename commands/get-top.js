const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const BetUsers = require("../models/bet-users.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get-top")
        .setDescription("Returns participants with highest points"),

    async execute(interaction) {
        
        try {

            const { options } = interaction;

            //check thru the dataset and see if all games = "00000..."
            await interaction.deferReply();

            // const testUsers = [ { id: "1", points: 1000 }, { id: "2", points: 10000 }, { id: "3", points: 10}, { id: "4", points: 100 }, { id: "5", points: 1 }, { id: "6", points: 1000 }, { id: "7", points: 1000 }, { id: "8", points: 1000 }, { id: "9", points: 1000 }, { id: "10", points: 1000 }];

            var sortedUsers; //sorted according to points, largest to smallest
            var ptsonly;

            sortedUsers = await BetUsers.findAll({
                attributes: [ 'id', 'points' ],
                order: [
                    [ 'points', 'DESC' ],
                ],
                raw: true,
            });

            ptsonly = sortedUsers.map((user) => user.points);//contains duplicates

            //get top2pts
            var top2pts = [];

            for (let i = 0; i < ptsonly.length; i++) {
                if (top2pts.length == 2) {
                    break;
                };
                if (top2pts.includes(ptsonly[i])) {
                    continue;
                } else {
                    top2pts.push(ptsonly[i]);
                };
            };

            //check sortedUsers is corrected sorted
            console.log(sortedUsers);

            //get top2pts
            //top2pts = ptsonly.slice(0, 2);//largest to smallest

            var secondplaceusers = [];
            var firstplaceusers = [];

            for (i = 0; i < sortedUsers.length; i++) {
                //if points === 1st place points
                if (top2pts.length >= 1 && sortedUsers[i].points === top2pts[0]) {
                    try {
                        //in case member left
                        await interaction.guild.members.fetch(sortedUsers[i].id);
                        var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                        if (u.nickname){
                            //if nickname is present
                            firstplaceusers.push(u.nickname);
                        } else {
                            firstplaceusers.push(u.user.globalName);
                        };
                        
                    } catch (err) {
                        firstplaceusers.push(`*member-left*`);
                        continue;
                    };

                };
                if (top2pts.length >= 2 && sortedUsers[i].points === top2pts[1]) {
                    try {
                        //in case member left
                        await interaction.guild.members.fetch(sortedUsers[i].id);
                        var u = await interaction.guild.members.cache.get(sortedUsers[i].id);
                       
                        if (u.nickname) {
                            secondplaceusers.push(u.nickname);
                        } else {
                            secondplaceusers.push(u.user.globalName);
                        };

                    } catch (err) {
                        secondplaceusers.push(`*member-left*`);
                        continue;
                    };
                };
                if (sortedUsers[i].points < Math.min(top2pts)) {
                    break;
                };
            };

            const embed = new EmbedBuilder()
            .setColor("#ffd6e5")
            .setTitle(`Betting Leaderboards`)
            .setDescription(`\n**${top2pts[0]} points**${"<:support:1245296715205185607>"}\n${firstplaceusers.join("\n")}\n\n**${top2pts[1]} points**${"<:good:1245296709685350430>"}\n${secondplaceusers.join("\n")}`)
            .setFooter({ text: `Members who are on the leaderboards but left the server will be shown by "member-left".` })

            await interaction.editReply({ content: `${"Here you go!<:NestleLemonTeaSprite:1245293699672444959>"}`, embeds: [embed], ephemeral: true });

            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};