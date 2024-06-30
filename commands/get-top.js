const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const NewBetUsers = require("../models/bet-users2.js");

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

            sortedUsers = await NewBetUsers.findAll({
                attributes: [ 'id', 'name', 'points' ],
                order: [
                    [ 'points', 'DESC' ],
                ],
                raw: true,
            });

            ptsonly = sortedUsers.map((user) => user.points);//contains duplicates

            //get top2pts
            var top2pts = [];//changed to length === 5 to get top 5 points

            for (let i = 0; i < ptsonly.length; i++) {
                if (top2pts.length == 5) {
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
            var thirdplaceusers = [];
            var fourthplaceusers = [];
            var fifthplaceusers = [];

            for (i = 0; i < sortedUsers.length; i++) {

                //1stplaceusers

                //if points === 1st place points
                if (top2pts.length >= 1 && sortedUsers[i].points === top2pts[0]) {
                    try {
                        //get name
                        var userName = sortedUsers[i].name;

                        if (!userName) {
                            //if name is null
                            await interaction.guild.members.fetch(sortedUsers[i].id);
                            var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                            if (u.nickname){
                                //if nickname is present
                                userName = u.nickname;
                                firstplaceusers.push(u.nickname);
                            } else {
                                userName = u.user.displayName;
                                firstplaceusers.push(u.user.displayName);//globalName
                            };

                            //store to db
                            const test = await NewBetUsers.findByPk(sortedUsers[i].id);
                            test.name = userName;
                            await test.save();

                        } else {
                            //userName is present
                            firstplaceusers.push(userName);

                        };
                        
                    } catch (err) {
                        firstplaceusers.push(`*member-left*`);
                        continue;
                    };

                };

                //secondplaceusers 

                if (top2pts.length >= 2 && sortedUsers[i].points === top2pts[1]) {
                    try {
                        //get name
                        var userName = sortedUsers[i].name;

                        if (!userName) {
                            //if name is null
                            await interaction.guild.members.fetch(sortedUsers[i].id);
                            var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                            if (u.nickname){
                                //if nickname is present
                                userName = u.nickname;
                                secondplaceusers.push(u.nickname);
                            } else {
                                userName = u.user.displayName;
                                secondplaceusers.push(u.user.displayName);
                            };

                            //store to db
                            const test = await NewBetUsers.findByPk(sortedUsers[i].id);
                            test.name = userName;
                            await test.save();

                        } else {
                            //userName is present
                            secondplaceusers.push(userName);

                        };                   

                    } catch (err) {
                        secondplaceusers.push(`*member-left*`);
                        continue;
                    };
                };

                //thirdplaceusers

                if (top2pts.length >= 3 && sortedUsers[i].points === top2pts[2]) {
                    try {
                        //get name
                        var userName = sortedUsers[i].name;

                        if (!userName) {
                            //if name is null
                            await interaction.guild.members.fetch(sortedUsers[i].id);
                            var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                            if (u.nickname){
                                //if nickname is present
                                userName = u.nickname;
                                thirdplaceusers.push(u.nickname);
                            } else {
                                userName = u.user.displayName;
                                thirdplaceusers.push(u.user.displayName);
                            };

                            //store to db
                            const test = await NewBetUsers.findByPk(sortedUsers[i].id);
                            test.name = userName;
                            await test.save();

                        } else {
                            //userName is present
                            thirdplaceusers.push(userName);

                        };                   

                    } catch (err) {
                        thirdplaceusers.push(`*member-left*`);
                        continue;
                    };
                };

                //fourthplaceusers

                if (top2pts.length >= 4 && sortedUsers[i].points === top2pts[3]) {
                    try {
                        //get name
                        var userName = sortedUsers[i].name;

                        if (!userName) {
                            //if name is null
                            await interaction.guild.members.fetch(sortedUsers[i].id);
                            var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                            if (u.nickname){
                                //if nickname is present
                                userName = u.nickname;
                                fourthplaceusers.push(u.nickname);
                            } else {
                                userName = u.user.displayName;
                                fourthplaceusers.push(u.user.displayName);
                            };

                            //store to db
                            const test = await NewBetUsers.findByPk(sortedUsers[i].id);
                            test.name = userName;
                            await test.save();

                        } else {
                            //userName is present
                            fourthplaceusers.push(userName);

                        };                   

                    } catch (err) {
                        fourthplaceusers.push(`*member-left*`);
                        continue;
                    };
                };

                //fifthplaceusers

                if (top2pts.length >= 5 && sortedUsers[i].points === top2pts[4]) {
                    try {
                        //get name
                        var userName = sortedUsers[i].name;

                        if (!userName) {
                            //if name is null
                            await interaction.guild.members.fetch(sortedUsers[i].id);
                            var u = await interaction.guild.members.cache.get(sortedUsers[i].id);

                            if (u.nickname){
                                //if nickname is present
                                userName = u.nickname;
                                fifthplaceusers.push(u.nickname);
                            } else {
                                userName = u.user.displayName;
                                fifthplaceusers.push(u.user.displayName);
                            };

                            //store to db
                            const test = await NewBetUsers.findByPk(sortedUsers[i].id);
                            test.name = userName;
                            await test.save();

                        } else {
                            //userName is present
                            fifthplaceusers.push(userName);

                        };                   

                    } catch (err) {
                        fifthplaceusers.push(`*member-left*`);
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
            .setDescription(`\n**${top2pts[0]} points**${"<:support:1245296715205185607>"}\n${firstplaceusers.join("\n")}\n\n**${top2pts[1]} points**${"<:good:1245296709685350430>"}\n${secondplaceusers.join("\n")}\n\n**${top2pts[2]} points**${"<:happy:1245302354484400188>"}\n${thirdplaceusers.join("\n")}\n\n**${top2pts[3]} points**${"<:embrace:1167328189362741358>"}\n${fourthplaceusers.join("\n")}\n\n**${top2pts[4]} points**${"<:cheers:1245296713137131562>"}\n${fifthplaceusers.join("\n")}`)
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