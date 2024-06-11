const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const NewBetUsers = require("../models/bet-users.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update-points")
        .setDescription("Updates points based on match results")
        .addIntegerOption(option => option.setName("match-number")
            .setDescription("Match Number")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(true))
        .addStringOption(option => option.setName("who-wins")
            .setDescription("Choose the team number who wins")
            .addChoices(
                { name: "1", value: "1" },
                { name: "2", value: "2" },

            )
            .setRequired(true)),

    async execute(interaction) {
        
        try {

            if (interaction.user.id !== "697822391971086406") {
                await interaction.reply({ content: `Please do not use this command, thank you!!${"<:idv1:1244224588531892314>"}`, ephemeral: true });
                return;
            };

            const { options } = interaction;
            const matchNumber = options.getInteger("match-number");
            const teamwins = options.getString("who-wins");

            await interaction.deferReply();

            const allUsers = await NewBetUsers.findAll();
            const update = [`match ${matchNumber}`];

            //how many user wins and how many losses
            var winbets = 0;
            var losebets = 0;

            //get array of winner bets 
            var winnerBets= [];

            //get array of loser bets
            var loserBets = [];

            for (let i = 0; i < allUsers.length; i++) {
                let a = allUsers[i];
                if (a.games[matchNumber-1] === "1" && teamwins === "1" || a.games[matchNumber-1] === "3" && teamwins === "1") {
                    winbets += 1;
                    winnerBets.push(a);
                };
                if (a.games[matchNumber-1] === "2" && teamwins === "2" || a.games[matchNumber-1] === "4" && teamwins === "2") {
                    winbets += 1;
                    winnerBets.push(a);
                };
                if (a.games[matchNumber-1] === "1" && teamwins === "2" || a.games[matchNumber-1] === "3" && teamwins === "2") {
                    losebets += 1;
                    loserBets.push(a);
                };
                if (a.games[matchNumber-1] === "2" && teamwins === "1" || a.games[matchNumber-1] === "4" && teamwins === "1") {
                    losebets += 1;
                    loserBets.push(a);
                };
            };

            //get array of all winner bets 
            const winnerBetsPoints = winnerBets.map((user) => {
                if (user.games[matchNumber-1] === "3" || user.games[matchNumber-1] === "4") {
                    return user.points;
                } else {
                    return 100;
                };
            });

            //get array of all loser bets 
            const loserBetsPoints = loserBets.map((user) => {
                if (user.games[matchNumber-1] === "3" || user.games[matchNumber-1] === "4") {
                    return user.points;
                } else {
                    return 100;
                };
            });

            var sum = 0;
            winnerBetsPoints.forEach(x => {
                sum += x;
            });
            loserBetsPoints.forEach(x => {
                sum += x;
            });

            //find min of winner bets 
            const min = Math.min.apply(Math, winnerBetsPoints);

            //convert array of winner bets to ratio of winner bets/min
            var ratioWin = [];//ratio to 3dp
            for (let i = 0; i < winnerBetsPoints.length; i++) {
                ratioWin.push(parseFloat((winnerBetsPoints[i]/min).toFixed(3)));
            };

            //find sum of ratio array
            var sumRatio = 0;
            ratioWin.forEach( x => {
                sumRatio += x;
            });

            console.log("win");
            console.log(winnerBetsPoints);
            console.log(ratioWin);
            console.log("lose");
            console.log(loserBetsPoints);
            console.log(`min = ${min}`);
            console.log(`sumRatio = ${sumRatio}`);
            console.log(`sum = ${sum}`);

            //loop through winnerBets to update points 
            for (let i = 0; i < winnerBets.length; i++) {
                var u = winnerBets[i];
                
                if (u.games[matchNumber-1] === "3" || u.games[matchNumber-1] === "4") {
                    //if all in
                    var won = Math.round((sum/sumRatio) * (u.points/min));
                    update.push(`${u.name} = ${won} (All in)`);
                    u.points = won;
                    await u.save();
                    continue;
                };

                var won = Math.round((sum/sumRatio) * (100/min));
                update.push(`${u.name} + ${won - 100}`)
                u.points += (won - 100);
                await u.save();
                continue;
            };

            //loop through loserBets to update points 
            for (let i = 0; i < loserBets.length; i++) {
                var u = loserBets[i];

                if (u.games[matchNumber-1] === "3" || u.games[matchNumber-1] === "4") {
                    //if all in

                    update.push(`${u.name} = 0 (All in)`);
                    u.points = 0;
                    await u.save();
                    continue;
                };

                update.push(`${u.name} - 100`)
                u.points -= 100;
                await u.save();
                continue;
            };
            
            console.log(update);

            const embed = new EmbedBuilder()
            .setColor("#8E7AF0")
            .setDescription(`__Overall__\nPercentage of bets for winning team = ${inlineCode((winbets/(winbets + losebets)*100).toFixed(1))}%\n\n__Statistics for Winning Bets__\nMinimum betting points placed = ${inlineCode(`${min}`)}\nBetting points earned for betting ${min} = ${inlineCode(`${(sum/sumRatio).toFixed(2)}`)}\nBetting points earned for betting *B* betting points where *B > ${min}* = ${inlineCode(`B/${min} × ${(sum/sumRatio).toFixed(2)}`)}`)
            
            await interaction.editReply({ content: `I have updated the betting points for Match ${matchNumber}<:NestleLemonTeaSprite:1245293699672444959>`, embeds: [embed] });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};