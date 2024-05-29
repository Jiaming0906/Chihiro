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

            const testUsers = await BetUsers.findAll();

            // const testUsers = [ { id: "1", points: 1000 }, { id: "2", points: 10000 }, { id: "3", points: 10}, { id: "4", points: 100 }, { id: "5", points: 1 }, { id: "6", points: 1000 }, { id: "7", points: 1000 }, { id: "8", points: 1000 }, { id: "9", points: 1000 }, { id: "10", points: 1000 }];

            var sortedUsers = []; //sorted according to points, largest to smallest
            var ptsonly = [];
            
            for (let i = 0; i < testUsers.length; i++) {

                if (!ptsonly.includes(testUsers[i].points)) {
                    ptsonly = ptsonly.concat(testUsers[i].points);
                };

                if (!sortedUsers.length) {
                    //if empty
                    
                    sortedUsers.push({ id: testUsers[i].id, points: testUsers[i].points});

                } else {
                    //if not empty, compare

                    for (let j = 0; j < sortedUsers.length; j++) {

                        //if reached the last ele of sortedUsers && test to add is smaller than last ele of sortedUsers
                        if (j === sortedUsers.length-1 && sortedUsers[j].points >= testUsers[i].points) {
                            sortedUsers = sortedUsers.concat({ id: testUsers[i].id, points: testUsers[i].points});
                            break;
                        };

                        //if current j ele in sortedUsers is larger than test to add
                        if (sortedUsers[j].points > testUsers[i].points) {
                            continue;
                        };

                        //if current j ele in sortedUsers is smaller/equals to test to add
                        if (sortedUsers[j].points <= testUsers[i].points) {
                            sortedUsers = sortedUsers.slice(0, j).concat([{ id: testUsers[i].id, points: testUsers[i].points}], sortedUsers.slice(j));
                            break;
                        };

                    };

                    
                };
            };


            //check sortedUsers is corrected sorted
            console.log(sortedUsers);

            //get the values of top three points
            ptsonly.sort(function(a , b) { return b - a });
            const top3pts = ptsonly.slice(0, 3);//largest to smallest

            var thirdplaceusers = [];
            var secondplaceusers = [];
            var firstplaceusers = [];

            for (i = 0; i < sortedUsers.length; i++) {
                //if points === 1st place points
                if (top3pts.length >= 1 && sortedUsers[i].points === top3pts[0]) {
                    try {
                        //in case member left
                        await interaction.guild.members.fetch(sortedUsers[i].id);
                        var u = await interaction.guild.members.cache.get(sortedUsers[i].id);
                        
                        firstplaceusers.push(u);
                    } catch (err) {
                        firstplaceusers.push(`member-id: ${sortedUsers[i].id}`);
                        continue;
                    };

                };
                if (top3pts.length >= 2 && sortedUsers[i].points === top3pts[1]) {
                    try {
                        //in case member left
                        await interaction.guild.members.fetch(sortedUsers[i].id);
                        var u = await interaction.guild.members.cache.get(sortedUsers[i].id);
                       
                        secondplaceusers.push(u);
                    } catch (err) {
                        secondplaceusers.push(`member-id: ${sortedUsers[i].id}`);
                        continue;
                    };
                };
                if (top3pts.length >= 3 && sortedUsers[i].points === top3pts[2]) {
                    try {
                        //in case member left
                        await interaction.guild.members.fetch(sortedUsers[i].id);
                        var u = await interaction.guild.members.cache.get(sortedUsers[i].id);
                        
                        thirdplaceusers.push(u);
                    } catch (err) {
                        thirdplaceusers.push(`member-id: ${sortedUsers[i].id}`);
                        continue;
                    };
                };
                if (sortedUsers[i].points < Math.min(top3pts)) {
                    break;
                };
            };

            const embed = new EmbedBuilder()
            .setColor("#ffd6e5")
            .setTitle(`Betting Leaderboards`)
            .setDescription(`\n_${top3pts[0]} points_${"<:support:1245296715205185607>"}\n${firstplaceusers}\n\n_${top3pts[1]} points_${"<:good:1245296709685350430>"}\n${secondplaceusers}\n\n_${top3pts[2]} points_${"<:cheers:1245296713137131562>"}\n${thirdplaceusers}`)
            .setFooter({ text: `Members who are on the leaderboards but left the server will be shown by their id numbers.` })

            await interaction.editReply({ content: `${"Here you go!<:NestleLemonTeaSprite:1245293699672444959>"}`, embeds: [embed]});

            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};